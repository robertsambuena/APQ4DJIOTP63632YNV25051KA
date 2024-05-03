import { Endpoints } from "@octokit/types"
import { Repo } from "../../types/repository"

type RepoResponse = Endpoints['GET /search/repositories']['response']['data']['items']
  | Endpoints['GET /orgs/{org}/repos']['response']['data']

export const convertResponseToRepos = (repos: RepoResponse): Repo[] => {
  return repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    open_issues_count: repo.open_issues_count ?? 0,
    stargazers_count: repo.stargazers_count ?? 0,
    repoUrl: repo.html_url,
  }))
}
