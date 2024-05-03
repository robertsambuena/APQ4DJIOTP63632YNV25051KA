import { Alert, Button, Link, Typography } from "@mui/material"

export const RepoDataSearchWarningToast = () => (
  <Alert severity="warning">
    <Typography variant="body1">
      Search is taking a while, you might want to reset the search.
    </Typography>
    <Button onClick={() => window.location.reload()} component={Link}>
      Reload app
    </Button>
  </Alert>
)

export const RepoDataResetSearchBtn = () => (
  <Button onClick={() => window.location.reload()} component={Link}>
    Search is taking a while, click here to reset search.
  </Button>
)
