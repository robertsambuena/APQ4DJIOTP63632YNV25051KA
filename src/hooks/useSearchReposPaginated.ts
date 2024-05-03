import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { octokit} from "../utils/octokit"
import { Endpoints } from "@octokit/types"

type UseGithubRepositoriesConfig = {
  org: string
  searchKey: string | null
}

type GithubRepoResponse = Endpoints['GET /search/repositories']['response']

export const useReposPaginated = (props: UseGithubRepositoriesConfig) => {
  const { org, searchKey } = props

  const buildQuery: string[] = []

  if (searchKey !== null) {
    buildQuery.push(searchKey)
  }
  
  buildQuery.push(`org:${org}`)

  const params = {
    q: buildQuery.join(' '),
    page: 0,
    per_page: 100,
  }

  return useQuery<GithubRepoResponse['data']['items']>({
    queryKey: ['search-repos', params],
    queryFn: async () => {
      const data = await octokit.paginate(octokit.rest.search.repos, params)

      return data
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    placeholderData: keepPreviousData
  })
}
