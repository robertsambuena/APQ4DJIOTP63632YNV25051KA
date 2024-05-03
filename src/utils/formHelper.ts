export const setNullOrNumber = (value: string | number | null) => {
  return value === '' ? null : value
}
