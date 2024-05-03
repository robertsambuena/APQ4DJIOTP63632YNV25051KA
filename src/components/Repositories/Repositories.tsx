import { Box } from "@mui/material"
import { RepositoryDataTable } from "./RepositoryDataTable"
import { FC, useState } from "react"
import { Organization } from "../../types/organization"
import { RepositoryOwner } from "./RepositoryOwner"
import { RepositoryFilterForms } from "./RepositoryFilter/RepositoryFilterForms"
import { RepoFilterFormState } from "./RepositoryFilter/RepositoryFilterTypes"

type RepositoriesProps = {
  org: Organization | null
}

export const Repositories: FC<RepositoriesProps> = (props) => {
  const { org } = props

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
      <Box sx={{paddingBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{marginLeft: 2}}>
          <RepositoryOwner org={org} />
        </Box>

        <RepositoryFilterForms onChange={setRepoFilter}/>
      </Box>

      <RepositoryDataTable orgID={org.id} repoFilter={repoFilter} />
    </Box>
  )
}
