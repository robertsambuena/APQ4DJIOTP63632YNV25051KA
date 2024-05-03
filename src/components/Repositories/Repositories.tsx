import { Box, Divider } from "@mui/material"
import { RepositoryDataTable } from "./RepositoryData/RepositoryDataTable"
import { FC, useState } from "react"
import { Organization } from "../../types/organization"
import { RepositoryOwner } from "./RepositoryOwner"
import { RepositoryFilterForms } from "./RepositoryFilter/RepositoryFilterForms"
import { RepoFilterFormState } from "./RepositoryFilter/RepositoryFilterTypes"
import { useIsFetching } from "@tanstack/react-query"

type RepositoriesProps = {
  org: Organization | null
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { org } = props

  const isSearchingRepos = useIsFetching({queryKey: ['search-repos']})

  const [repoFilter, setRepoFilter] = useState<RepoFilterFormState>({
    searchKey: null,
    minOpenIssues: null,
    maxOpenIssues: null,
  })

  if (!org) {
    return null
  }

  return (
    <Box sx={{paddingY: 8}}>
      <Box sx={{paddingBottom: 2}}>
        <Box sx={{marginLeft: 2, paddingY: 2}}>
          <RepositoryOwner org={org} />
        </Box>

        <Divider />

        <Box sx={{paddingY: 2, width: '100%'}}>
          <RepositoryFilterForms onChange={setRepoFilter} disabled={isSearchingRepos > 0}/>
        </Box>
      </Box>

      <RepositoryDataTable
        orgID={org.id}
        searchKey={repoFilter.searchKey}
        minOpenIssues={repoFilter.minOpenIssues}
        maxOpenIssues={repoFilter.maxOpenIssues}
      />
    </Box>
  )
}
