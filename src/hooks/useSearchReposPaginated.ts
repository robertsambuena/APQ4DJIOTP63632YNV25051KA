import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { PaginatedSearchRepos } from "../services/PaginatedSearchRepos"
import { PaginatedReposByOrg, PaginatedReposByOrgParams } from "../services/PaginatedReposByOrg"
import { convertReposToDataGrid } from "../utils/apiHelper/repositoryHelper"
import toast from "react-hot-toast"
import { octokitErrorHandler } from "../utils/octokitUtils/octokitErrorHelper"
import { RequestError } from "octokit"

type UseGithubRepositoriesConfig = {
  org: string
  searchKey: string | null
}

type Params = {
  q: string
  page: number
  per_page: number
  type?: PaginatedReposByOrgParams['type']
}

export const useReposPaginated = (props: UseGithubRepositoriesConfig) => {
  const { org, searchKey } = props

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
    queryFn: async () => {
      try {
        const data = mode === 'search'
          ? await PaginatedSearchRepos(params)
          : await PaginatedReposByOrg({...params, org})

        return convertReposToDataGrid(data)
      }
      catch (error: unknown) {
        if (error instanceof RequestError) {
          toast.error(octokitErrorHandler('Repositories', error))
        }

        return []
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    placeholderData: keepPreviousData,
  })
}
