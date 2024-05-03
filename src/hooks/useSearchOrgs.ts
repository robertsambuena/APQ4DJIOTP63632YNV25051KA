import { useQuery } from "@tanstack/react-query"
import { octokit } from "../utils/octokitUtils/octokit"
import { RequestError } from "@octokit/request-error"
import toast from "react-hot-toast"
import { octokitErrorHandler } from "../utils/octokitUtils/octokitErrorHelper"

export const useSearchOrgs = (searchKey: string) => {
  return useQuery({
    queryKey: ['search-orgs', searchKey],
    queryFn: async () => {
      try {
        const response = await octokit.rest.search.users({
          q: `${searchKey} type:org`,
        })

        return response.data.items
      } catch (error: unknown) {
        if (error instanceof RequestError) {
          toast.error(octokitErrorHandler('Repositories', error))
        }

        return []
      }
    },
  })
}
