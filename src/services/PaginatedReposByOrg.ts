import { Endpoints } from "@octokit/types"
import { octokit } from "../utils/octokitUtils/octokit"

export type PaginatedReposByOrgType = {
  (params: Endpoints['GET /orgs/{org}/repos']['parameters']):
    Promise<Endpoints['GET /orgs/{org}/repos']['response']['data']>
}

export const paginatedReposByOrg: PaginatedReposByOrgType = (
  params: Endpoints['GET /orgs/{org}/repos']['parameters'],
) => {
  return octokit.paginate(octokit.rest.repos.listForOrg, params)
}
