import { PaginatedReposByOrgResponse } from "../../services/PaginatedReposByOrg"
import { PaginatedSearchReposResponse } from "../../services/PaginatedSearchRepos"
import { Repo } from "../../types/repository"

export const convertReposToDataGrid = (repos: PaginatedSearchReposResponse | PaginatedReposByOrgResponse): Repo[] => {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    open_issues_count: repo.open_issues_count ?? 0,
    stargazers_count: repo.stargazers_count ?? 0,
    repoUrl: repo.html_url,
  }))
}
