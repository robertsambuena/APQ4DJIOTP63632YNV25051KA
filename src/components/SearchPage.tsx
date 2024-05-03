import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material"
import { useState } from "react"
import { Repositories } from "./Repositories/Repositories"
import { Organizations } from "./Organizations/Organizations"
import { Organization } from "../types/organization"

export const SearchPage = () => {
  const [org, setOrg] = useState<Organization | null>(null)

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        '& > :not(style)': {
          width: 1200,
          height: 'max-content',
          marginTop: 10,
        },
      }}
    >
      <Card>
        <CardHeader title="Github Search" />
        <Divider/>
        <CardContent>
          <Organizations onSelect={(selectedOrg) => setOrg(selectedOrg)}/>

          <Repositories org={org}/>
        </CardContent>
      </Card>
    </Box>
  )
}
