import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Repo } from "../../../types/repository";
import { Link } from "@mui/material";

export const columns: GridColDef[] = [{
    field: 'name',
    headerName: 'Name',
    flex: 1,
    renderCell: (params: GridRenderCellParams<Repo, string>) => (
      <Link target="_blank" href={params.row.repoUrl}>{params.value}</Link>
    )
  }, {
    field: 'open_issues_count',
    headerName: 'Number of open issues',
    width: 200,
    renderCell: (params: GridRenderCellParams<Repo, number>) => (
      <Link target="_blank" href={params.row.repoUrl + '/issues'}>{params.value}</Link>
    )
  }, {
    field: 'stargazers_count',
    headerName: 'Number of stars',
    width: 200,
    renderCell: (params: GridRenderCellParams<Repo, number>) => (
      <Link target="_blank" href={params.row.repoUrl + '/stargazers'}>{params.value}</Link>
    )
  },
]

export const repoDataFilter = (
  repo: Repo, minOpenIssues: number | null, maxOpenIssues: number | null,
) => {

  if (minOpenIssues === null || maxOpenIssues === null) {
    return true
  }

  return (
    (minOpenIssues && repo.open_issues_count >= minOpenIssues) &&
    (maxOpenIssues && repo.open_issues_count <= maxOpenIssues)
  )
}