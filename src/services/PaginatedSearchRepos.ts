import { Endpoints } from "@octokit/types"
import { octokit } from "../utils/octokitUtils/octokit"

export type PaginatedSearchReposType = {
  (params: Endpoints['GET /search/repositories']['parameters']):
    Promise<Endpoints['GET /search/repositories']['response']['data']['items']>
}

export const paginatedSearchRepos = async (
  params: Endpoints['GET /search/repositories']['parameters'],
): Promise<Endpoints['GET /search/repositories']['response']['data']['items']> => {
  return octokit.paginate(octokit.rest.search.repos, params)
}
