import { Box, TextField } from "@mui/material"
import { FC, useEffect } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { TextFieldWithDebounce } from "../../../common/TextFieldWithDebounce"
import { RepoFilterFormState } from "./RepositoryFilterTypes"
import { defaultValues, schema } from "./RepositoryFilterFormsResolver"
import { yupResolver } from "@hookform/resolvers/yup"
import { setNullOrNumber } from "../../../utils/formHelper"

type RepositoryFilterFormsProps = {
  onChange: (value: RepoFilterFormState) => void
  disabled?: boolean
}

export const RepositoryFilterForms: FC<RepositoryFilterFormsProps> = (props) => {
  const { onChange, disabled } = props

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
  }  = methods

  const submitCb = () => {
    onChange(watch())
  }

  /**
   * This is a workaround to trigger the form validation when the form has changed.
   */
  useEffect(() => {
    const subscription = watch(() => {
      handleSubmit(submitCb)()
    })
    return () => subscription.unsubscribe()

    // eslint-disable-next-line
}, [handleSubmit, watch])

  return (
    <FormProvider {...methods}>
      <form>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{width: 600}}>
            <Controller
              name="searchKey"
              control={control}
              render={({field: {onChange}}) => {
                return (
                  <TextFieldWithDebounce
                    label="Filter repositories"
                    fullWidth
                    disabled={disabled}
                    onSearch={onChange}
                    error={!!errors.searchKey}
                    helperText={errors.searchKey?.message}
                  />
                )
              }}
            />
          </Box>

          <Box sx={{width: 400}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>

              <Box sx={{ marginRight: 2, maxWidth: 200 }}>
                <Controller
                  name="minOpenIssues"
                  control={control}
                  render={({field: {value, onChange}}) => {
                    return (
                      <TextField
                        label="Min open issues"
                        value={value ?? null}
                        type="number"
                        disabled={disabled}
                        onChange={(e) => onChange(setNullOrNumber(e.target.value))}
                        error={!!errors.minOpenIssues}
                        helperText={errors.minOpenIssues?.message}
                      />
                    )
                  }}
                />
              </Box>

              <Box sx={{ maxWidth: 200 }}>
                <Controller
                  name="maxOpenIssues"
                  control={control}
                  render={({field: {value, onChange}}) => {
                    return (
                      <TextField
                        label="Max open issues"
                        value={value ?? null}
                        type="number"
                        disabled={disabled}
                        onChange={(e) => onChange(setNullOrNumber(e.target.value))}
                        error={!!errors.maxOpenIssues}
                        helperText={errors.maxOpenIssues?.message}
                      />
                    )
                  }}
                />
              </Box>

            </Box>
          </Box>

        </Box>

      </form>
    </FormProvider>
  )
}
