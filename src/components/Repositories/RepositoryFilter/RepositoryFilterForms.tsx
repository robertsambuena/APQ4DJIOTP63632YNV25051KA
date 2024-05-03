import { Box, TextField, Typography } from "@mui/material"
import { FC, useEffect } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { TextFieldWithDebounce } from "../../../common/TextFieldWithDebounce"
import { RepoFilterFormState } from "./RepositoryFilterTypes"
import { defaultValues, schema } from "./RepositoryFilterFormsResolver"
import { yupResolver } from "@hookform/resolvers/yup"
import { setNullOrNumber } from "../../../utils/formHelper"

type RepositoryFilterFormsProps = {
  onChange: (value: RepoFilterFormState) => void
}

export const RepositoryFilterForms: FC<RepositoryFilterFormsProps> = (props) => {
  const { onChange } = props

  const methods = useForm<RepoFilterFormState>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  }  = methods

  /**
   * This is a workaround to trigger the form validation when the form is submitted.
   */
  useEffect(() => {
    const subscription = watch(() => handleSubmit(onChange)())
    return () => subscription.unsubscribe()
}, [handleSubmit, watch])

  return (
    <FormProvider {...methods}>
      <form>

        <Box sx={{width: 800, display: 'flex', alignItems: 'center'}}>
          <Box sx={{marginRight: 2, width: 800}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <Typography variant="body1">Filter by open issues:</Typography>

              <Box sx={{ marginRight: 2 }}>
                <Controller
                  name="minOpenIssues"
                  control={control}
                  render={({field: {value, onChange}, ...fieldProps}) => {
                    return (
                      <TextField
                        {...fieldProps}
                        label="Min Star"
                        value={value ?? null}
                        type="number"
                        onChange={(e) => onChange(setNullOrNumber(e.target.value))}
                        error={!!errors.minOpenIssues}
                        helperText={errors.maxOpenIssues?.message}
                      />
                    )
                  }}
                />
              </Box>

              <Controller
                name="maxOpenIssues"
                control={control}
                render={({field: {value, onChange}, ...fieldProps}) => {
                  return (
                    <TextField
                      {...fieldProps}
                      label="Max Star"
                      value={value ?? null}
                      type="number"
                      onChange={(e) => onChange(setNullOrNumber(e.target.value))}
                      error={!!errors.minOpenIssues}
                      helperText={errors.maxOpenIssues?.message}
                    />
                  )
                }}
              />

            </Box>
          </Box>

          <Controller
            name="searchKey"
            control={control}
            render={({field: {onChange}}) => {
              const handleSearch = (searchKey: string) => {
                onChange(searchKey)
                trigger('searchKey')
              }
              return (
                <TextFieldWithDebounce
                  label="Filter repositories"
                  fullWidth
                  onSearch={handleSearch}
                />
              )
            }}
          />
        </Box>

      </form>
    </FormProvider>
  )
}
