import { object, string, number, ObjectSchema } from "yup"
import { RepoFilterFormState } from "./RepositoryFilterTypes"

export const schema: ObjectSchema<RepoFilterFormState> = object().shape({
  searchKey: string().nullable().defined(),

  minOpenIssues: number().label('Min open issue filter').nullable().defined()
    .test(
      'minShouldBeLessThanMax',
      'Min open issue filter must be less than max open issue filter',
      function (value) {
        const { maxOpenIssues } = this.parent

        // If maxOpenIssues is null, then minOpenIssues can be null
        if (maxOpenIssues === null && value === null) return true

        return value === null || value < maxOpenIssues
      }),

  maxOpenIssues: number().label('Max open issue filter').nullable().defined()
    .test(
      'maxShouldBeGreaterThanMin',
      'Max open issue filter must be greater than min open issue filter',
      function (value) {
        const { minOpenIssues } = this.parent

        // If minOpenIssues is null, then maxOpenIssues can be null
        if (minOpenIssues === null && value === null) return true

        return value === null || value > minOpenIssues
      }),
})

export const defaultValues: RepoFilterFormState = {
  searchKey: null,
  minOpenIssues: null,
  maxOpenIssues: null,
}
