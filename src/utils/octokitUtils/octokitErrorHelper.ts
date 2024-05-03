import { RequestError } from "octokit"

export const octokitErrorHandler = (context: string, error: RequestError) => {
  if (error.status === 403 || error.status === 429) {
    return 'Oh no! You have exceeded the rate limit for searching organizations :('
  }

  if (error.status === 422) {
    return 'Invalid search query! Please try again.'
  }

  if (error.status === 404) {
    return `${context} not found, it might be private?`
  }

  if (error.status === 500) {
    return 'GitHub API is down'
  }

  if (error.status === 401) {
    return 'Unauthorized'
  }

  if (error.status === 400) {
    return 'Bad request'
  }

  return 'An error occurred'
}
