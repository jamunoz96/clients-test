import React, { useEffect } from 'react'
import {
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material'
import { KeyboardArrowLeft, Save } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router'
import { Stack } from '@mui/system'
import { useForm, Controller } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'Hooks/useApp'
import { getClientAsync, saveClientAsync, updateClientAsync } from 'Store/Actions/client'
import { selectClient } from 'Store/Slices/client'

const Form = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectClient)
  const go = useNavigate()
  const {
    reset,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  })
  const onSubmit = (data: any) => {
    const action = id ? updateClientAsync(data) : saveClientAsync(data)
    dispatch(action)
      .unwrap()
      .then((res) => go('/'))
      .catch((err) => console.log('error'))
  }

  useEffect(() => {
    if (id) {
      dispatch(getClientAsync(id))
        .unwrap()
        .then(({ data }) => reset(data))
        .catch((err) => go('/'))
    }
  }, [id])

  if (status === 'loading') {
    return <LinearProgress aria-label="loading-client" />
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Typography color="primary" variant="h4">
            Formulario cliente
          </Typography>
          <Grid marginTop={1} spacing={2} container>
            <Grid item xs={6}>
              <Controller
                name="names"
                defaultValue=""
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Nombre" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="document"
                defaultValue=""
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Documento"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="address"
                defaultValue=""
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Dirección" variant="outlined" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone"
                defaultValue=""
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Teléfono"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
          </Grid>
          <Stack marginTop={2} direction="row" spacing={2} justifyContent="space-between">
            <Button onClick={() => go('/')} variant="outlined" startIcon={<KeyboardArrowLeft />}>
              Volver
            </Button>
            <Button
              disabled={!isValid}
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Save />}>
              Guardar
            </Button>
          </Stack>
        </CardContent>
      </form>
    </Card>
  )
}

export default Form
