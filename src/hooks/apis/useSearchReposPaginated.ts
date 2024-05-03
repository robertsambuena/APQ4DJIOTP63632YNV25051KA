import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { paginatedSearchRepos } from "../../services/PaginatedSearchRepos"
import { paginatedReposByOrg } from "../../services/PaginatedReposByOrg"
import { convertResponseToRepos } from "../../utils/apiHelperUtils/repositoryHelper"
import { useErrorHandler } from "./useErrorHandler"
import { Endpoints } from "@octokit/types"

type UseGithubRepositoriesConfig = {
  org: string
  searchKey: string | null
}

type Params = {
  q: string
  page: number
  per_page: number
  type?: Endpoints['GET /orgs/{org}/repos']['parameters']['type']
}

export const useReposPaginated = (props: UseGithubRepositoriesConfig) => {
  const { org, searchKey } = props

  const { throwErrorToast } = useErrorHandler()

  const buildQuery: string[] = []

  let mode: 'search' | 'repoByOrg' = 'repoByOrg'

  if (searchKey !== null && searchKey !== '') {
    buildQuery.push(searchKey)
    mode = 'search'
  }
  
  buildQuery.push(`org:${org}`)

  const params: Params = {
    q: buildQuery.join(' '),
    page: 0,
    per_page: 100,
  }

  if (mode === 'search' && org) {
    params.type = 'all'
  }

  return useQuery({
    queryKey: ['search-repos', mode, params.q],
    queryFn: async ({ queryKey }) => {
      try {
        const data = mode === 'search'
          ? await paginatedSearchRepos(params)
          : await paginatedReposByOrg({...params, org})

        return convertResponseToRepos(data)
      }
      catch (error: unknown) {
        throwErrorToast(error, queryKey)
        return []
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    placeholderData: keepPreviousData,
  })
}
