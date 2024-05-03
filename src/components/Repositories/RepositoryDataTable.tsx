import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC, useMemo, useState } from "react"
import { useReposPaginated } from '../../hooks/useSearchReposPaginated'
import { RepoFilterFormState } from './RepositoryFilter/RepositoryFilterTypes'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'open_issues_count', headerName: 'Number of open issues', width: 200 },
  { field: 'stargazers_count', headerName: 'Number of stars', width: 200 },
]

type RepositoryDataTableProps = {
  orgID: string
  repoFilter: RepoFilterFormState
  defaultPage?: number
  defaultPageSize?: number
}

export const RepositoryDataTable: FC<RepositoryDataTableProps> = (props) => {
  const { orgID, repoFilter, defaultPage = 0, defaultPageSize = 100 } = props

  const { searchKey, minOpenIssues, maxOpenIssues } = repoFilter

  const [paginationModel, setPaginationModel] = useState({
    page: defaultPage,
    pageSize: defaultPageSize,
  })

  const { data: repos, isFetching } = useReposPaginated({
    org: orgID,
    searchKey,
  })

  /**
   * Client-side filtering of the repositories based on the filter form state.
   * This is not ideal but for now it's good enough :)
   */
  const filteredRepos = useMemo(() => {
    if (!repos) return []

    return repos.filter((repo) => {
      return (
        (!minOpenIssues || repo.open_issues_count >= minOpenIssues) &&
        (!maxOpenIssues || repo.open_issues_count <= maxOpenIssues)
      )
    })
  }, [repos, minOpenIssues, maxOpenIssues])

  return (
    <DataGrid
      rows={filteredRepos}
      columns={columns}
      localeText={{ noRowsLabel: 'No results.' }}
      sx={{ minHeight: 200, width: '100%'}}
      loading={isFetching}
      pageSizeOptions={[10, 20, 50, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      autoHeight={true}
    />
  )
}
