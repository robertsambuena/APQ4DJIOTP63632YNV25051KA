import { Endpoints } from "@octokit/types"
import { octokit } from "../utils/octokitUtils/octokit"

export type PaginatedReposByOrgParams = Endpoints['GET /orgs/{org}/repos']['parameters']
export type PaginatedReposByOrgResponse = Endpoints['GET /orgs/{org}/repos']['response']['data']

export type PaginatedReposByOrgType = {
  (params: PaginatedReposByOrgParams): Promise<PaginatedReposByOrgResponse>
}

export const PaginatedReposByOrg: PaginatedReposByOrgType = (
  params: Endpoints['GET /orgs/{org}/repos']['parameters'],
) => {
  return octokit.paginate(octokit.rest.repos.listForOrg, params)
}
