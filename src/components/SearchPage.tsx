import { Box, Card, CardContent, CardHeader, Divider, styled } from "@mui/material"
import { useState } from "react"
import { Repositories } from "./Repositories/Repositories"
import { Organizations } from "./Organizations/Organizations"
import { Organization } from "../types/organization"
import logo from "../logo.png"
import { useIsFetching } from "@tanstack/react-query"

const SearchLogo = styled('img')(({theme}) => ({
  height: theme.spacing(4),
  width: theme.spacing(4),
  marginRight: theme.spacing(1),
}))

export const SearchPage = () => {
  const [org, setOrg] = useState<Organization | null>(null)
  const isSearchingRepos = useIsFetching({queryKey: ['search-repos']})

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
        <CardHeader title={(
          <Box sx={{ display: 'flex' }}>
            <SearchLogo src={logo}/> 
            Org the Dog
          </Box>
        )} />
        <Divider/>
        <CardContent>
          <Organizations disabled={isSearchingRepos > 0} onSelect={(selectedOrg) => setOrg(selectedOrg)}/>

          <Repositories org={org}/>
        </CardContent>
      </Card>
    </Box>
  )
}
