import { Endpoints } from "@octokit/types"
import { octokit } from "../utils/octokitUtils/octokit"

export type PaginatedSearchReposResponse = Endpoints['GET /search/repositories']['response']['data']['items']

export type PaginatedSearchReposType = {
  (params: Endpoints['GET /search/repositories']['parameters']):
    Promise<Endpoints['GET /search/repositories']['response']['data']['items']>
}

export const PaginatedSearchRepos: PaginatedSearchReposType = async (
  params: Endpoints['GET /search/repositories']['parameters'],
) => {
  return octokit.paginate(octokit.rest.search.repos, params)
}
