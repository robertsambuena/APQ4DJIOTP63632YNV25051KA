import { TextField, TextFieldProps } from "@mui/material"
import { FC, useEffect } from "react"
import { useDebounceState } from "../hooks/useDebounceState"

export type TextFieldWithDebounceProps = Omit<TextFieldProps, 'onChange'> & {
  onSearch: (value: string) => void
}

export const TextFieldWithDebounce: FC<TextFieldWithDebounceProps> = (props) => {
  const { onSearch, ...fieldProps } = props
  const {debouncedSearchKey, setSearchKey} = useDebounceState()

  useEffect(() => {
    onSearch(debouncedSearchKey)
  }, [onSearch, debouncedSearchKey])
  
  return (
    <TextField
      {...fieldProps}
      onChange={(e) => setSearchKey(e.target.value)}
    />
  )
}
