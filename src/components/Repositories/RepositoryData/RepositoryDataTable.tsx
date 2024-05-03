import { DataGrid } from '@mui/x-data-grid'
import { FC, useEffect, useMemo, useState } from "react"
import { useReposPaginated } from '../../../hooks/useSearchReposPaginated'
import { RepoFilterFormState } from '../RepositoryFilter/RepositoryFilterTypes'
import { columns, repoDataFilter } from './RepositoryUtils'
import { Button, Link } from '@mui/material'

type RepositoryDataTableProps = RepoFilterFormState & {
  orgID: string
  defaultPage?: number
  defaultPageSize?: number
}

export const RepositoryDataTable: FC<RepositoryDataTableProps> = (props) => {
  const { orgID, defaultPage = 0, defaultPageSize = 10 } = props

  const { searchKey, minOpenIssues, maxOpenIssues } = props

  const [paginationModel, setPaginationModel] = useState({
    page: defaultPage,
    pageSize: defaultPageSize,
  })

  const [showCancelFetch, setShowCancelFetch] = useState<boolean>(false)

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

    return repos.filter((repo) => repoDataFilter(repo, minOpenIssues, maxOpenIssues))
  }, [repos, minOpenIssues, maxOpenIssues])

  /**
   * Workaround to show a button to reset the search if it's taking too long.
   */
  useEffect(() => {
    if (isFetching) {
      const timeout = setTimeout(() => {
        setShowCancelFetch(true)
      }, 3000)
  
      return () => clearTimeout(timeout)
    } else {
      setShowCancelFetch(false)
    }
  }, [isFetching])

  return (
    <>
      {showCancelFetch &&
        (
          <Button onClick={() => window.location.reload()} component={Link}>
            Search is taking a while, click here to reset search.
          </Button>
        )
      }

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
    </>
  )
}
