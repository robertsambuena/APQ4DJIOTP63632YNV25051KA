export type RepoFilterFormState = {
  searchKey: string | null
  minOpenIssues: number | null
  maxOpenIssues: number | null
}

export type RepoFilterFormFields = 'searchKey' | 'minOpenIssues' | 'maxOpenIssues'
