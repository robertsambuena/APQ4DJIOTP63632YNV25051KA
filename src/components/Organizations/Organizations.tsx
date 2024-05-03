import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useSearchOrgs } from "../../hooks/apis/useSearchOrgs"
import { FC, useMemo } from "react"
import { useDebounceState } from "../../hooks/useDebounceState"
import SearchIcon from '@mui/icons-material/Search'
import { Organization } from "../../types/organization"

type OrganizationsProps = {
  onSelect: (selectedOrg: Organization| null) => void
  disabled?: boolean
}

export const Organizations: FC<OrganizationsProps> = (props) => {
  const { onSelect, disabled } = props
  const { debouncedSearchKey, setSearchKey } = useDebounceState()
  const { data, isFetching } = useSearchOrgs(debouncedSearchKey)

  const orgs = useMemo(() => {
    return data ? data : []
  }, [data])

  return (
    <Autocomplete
      options={orgs}
      getOptionLabel={(org) => org.id}
      renderInput={(params) => {
        return (
          <TextField {...params} required label="Select an organization"
            onChange={(e) => setSearchKey(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                isFetching ? <CircularProgress/> : <SearchIcon/>
              )
            }}
          />
        )
      }}
      onChange={(_, selectedOrg) => onSelect(selectedOrg)}
      disabled={disabled}
    />
  )
}
