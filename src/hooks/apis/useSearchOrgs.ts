import { useQuery } from "@tanstack/react-query"
import { octokit } from "../../utils/octokitUtils/octokit"
import { useErrorHandler } from "./useErrorHandler"
import { converResponseToOrg } from "../../utils/apiHelperUtils/organizationHelper"

export const useSearchOrgs = (searchKey: string) => {
  const { throwErrorToast } = useErrorHandler()

  return useQuery({
    queryKey: ['search-orgs', searchKey],
    queryFn: async ({ queryKey }) => {
      try {
        const response = await octokit.rest.search.users({
          q: `${searchKey} type:org`,
        })

        return converResponseToOrg(response.data.items)
      } catch (error: unknown) {
        throwErrorToast(error, queryKey)
        return []
      }
    },
  })
}
