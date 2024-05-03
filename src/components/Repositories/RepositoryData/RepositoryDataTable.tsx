import { DataGrid } from '@mui/x-data-grid'
import { FC, useEffect, useMemo, useState } from "react"
import { useReposPaginated } from '../../../hooks/apis/useSearchReposPaginated'
import { RepoFilterFormState } from '../RepositoryFilter/RepositoryFilterTypes'
import { columns, repoDataFilter } from './RepositoryUtils'
import toast from 'react-hot-toast'
import { RepoDataResetSearchBtn, RepoDataSearchWarningToast } from './RepositoryDataWarnings'

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

  const { data, isFetching } = useReposPaginated({
    org: orgID,
    searchKey,
  })

  /**
   * Client-side filtering of the repositories based on the filter form state.
   * This is not ideal but for now it's good enough :)
   */
  const repos = useMemo(() => {
    if (!data) return []

    return data.filter((repo) => repoDataFilter(repo, minOpenIssues, maxOpenIssues))
  }, [data, minOpenIssues, maxOpenIssues])

  /**
   * Workaround to show a button to reset the search if it's taking too long.
   * Mostly caused by our current implementation where we try to get __all__ of
   * the org's repositories from the GitHub API.
   */
  useEffect(() => {
    if (isFetching) {
      const timeout = setTimeout(() => {
        setShowCancelFetch(true)
        toast(() => <RepoDataSearchWarningToast />)
      }, 5000)
  
      return () => clearTimeout(timeout)
    } else {
      setShowCancelFetch(false)
    }
  }, [isFetching])

  return (
    <>
      {showCancelFetch && <RepoDataResetSearchBtn />}

      <DataGrid
        rows={repos}
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
