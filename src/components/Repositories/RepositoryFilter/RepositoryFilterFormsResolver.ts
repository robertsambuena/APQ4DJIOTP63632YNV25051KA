import { object, string, number, ObjectSchema } from "yup"
import { RepoFilterFormState } from "./RepositoryFilterTypes"

export const schema: ObjectSchema<RepoFilterFormState> = object().shape({
  minOpenIssues: number().label('Min open issue filter').nullable().defined()
    .test(
      'ifMinIsSetMaxShouldBeSet',
      'If min open issue filter is set, max open issue filter must be set',
      function (value) {
        const { maxOpenIssues } = this.parent

        return maxOpenIssues !== null || value === null
      })
    .test(
      'minShouldBeLessThanMax',
      'Min open issue filter must be less than max open issue filter',
      function (value) {
        const { maxOpenIssues } = this.parent

        return value === null || value < maxOpenIssues
      }),

  maxOpenIssues: number().label('Max open issue filter').nullable().defined()
    .test(
      'ifMaxIsSetMinShouldBeSet',
      'If max open issue filter is set, min open issue filter must be set',
      function (value) {
        const { minOpenIssues } = this.parent

        return minOpenIssues !== null || value === null
      })
    .test(
      'maxShouldBeGreaterThanMin',
      'Max open issue filter must be greater than min open issue filter',
      function (value) {
        const { minOpenIssues } = this.parent

        return value === null || value > minOpenIssues
      }),

  searchKey: string().label('Filter repo').defined().default(''),
})

export const defaultValues: RepoFilterFormState = {
  searchKey: null,
  minOpenIssues: null,
  maxOpenIssues: null,
}
