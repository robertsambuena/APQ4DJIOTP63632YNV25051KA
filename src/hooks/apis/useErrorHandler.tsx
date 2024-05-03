import { Alert, Box, Button } from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { RequestError } from "octokit"
import toast from "react-hot-toast"

type ErrorResponse = {
  message: string
  errors: Array<{
    resource: string
    field: string
    code: string
    message: string
  }>
}

export const useErrorHandler = () => {
  const queryClient = useQueryClient()

  const handleRefetch = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey })
    toast.dismiss()
  }

  const throwErrorToast = (error: unknown, queryKey: string[]) => {
    if (error instanceof RequestError) {
      if (error.response) {
        const errorResponse = error.response.data as ErrorResponse

        toast(() => (
          <Alert severity="error">
            {errorResponse?.errors[0]?.message}

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 2
            }}>
              <Button onClick={() => handleRefetch(queryKey)} color="warning">
                Re-fetch
              </Button>

              <Button onClick={() => window.location.reload()} color="error">
                Reload app
              </Button>
            </Box>
          </Alert>
        ), {
          duration: 10000
        })
      }
    }
  }

  return {
    throwErrorToast
  }
}