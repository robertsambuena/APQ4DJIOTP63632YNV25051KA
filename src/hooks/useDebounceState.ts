import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"

export const useDebounceState = (
  defaultSearchKey: string = '', debounceTimeInMs: number = 1000
  ) => {
  const [searchKey, setSearchKey] = useState<string>(defaultSearchKey)
  const debouncedSearch = useDebounce(searchKey, debounceTimeInMs)

  return {
    debouncedSearchKey: debouncedSearch,
    setSearchKey
  }
}
