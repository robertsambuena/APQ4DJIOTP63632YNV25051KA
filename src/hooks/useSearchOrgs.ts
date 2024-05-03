import { useQuery } from "@tanstack/react-query"
import { octokit } from "../utils/octokit"

export const useSearchOrgs = (searchKey: string) => {
  return useQuery({
    queryKey: ['orgs-' + searchKey],
    queryFn: async () => {
      const response = await octokit.rest.search.users({
        q: `${searchKey} type:org`,
      })

      return response.data.items
    }
  })
}
