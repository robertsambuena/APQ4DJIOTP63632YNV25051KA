import { Endpoints } from "@octokit/types"
import { Organization } from "../../types/organization"

export const converResponseToOrg = (data: Endpoints['GET /search/users']['response']['data']['items']): Organization[] => {
  return data.map((org) => ({
    id: org.login,
    logoUrl: org.avatar_url,
    url: org.html_url,
  }))
}
