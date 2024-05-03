import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { Organization } from "../../types/organization"
import { styled } from "@mui/material/styles"

const OwnerIcon = styled('img')(({theme}) => ({
  height: theme.spacing(4),
  width: theme.spacing(4),
  marginRight: theme.spacing(1),
}))

type RepositoryOwnerProps = {
  org: Organization
}

export const RepositoryOwner: FC<RepositoryOwnerProps> = (props) => {
  const { org } = props

  return (
    <Box sx={{ display: 'flex'}}>
      <OwnerIcon src={org.logoUrl} alt={org.id} />
      <Typography variant="h5">{org.id}</Typography>
    </Box>
  )
}
