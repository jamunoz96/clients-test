import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Fab,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Add, Delete, Edit, Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'Hooks/useApp'
import { selectClient } from 'Store/Slices/client'
import { deleteClientsAsync, getClientsAsync } from 'Store/Actions/client'
import ModalSearch from 'Components/ModalSearch'

const List = () => {
  const go = useNavigate()
  const dispatch = useAppDispatch()
  const { status, data } = useAppSelector(selectClient)
  const [allRows, setAllRows] = useState(false)
  const [checkedList, setCheckedList] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const getClients = () => dispatch(getClientsAsync())

  const handleAllChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllRows(event.target.checked)
    if (event.target.checked) {
      setCheckedList([...data].map((e) => e._id))
    } else {
      setCheckedList([])
    }
  }
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    let updatedList = [...checkedList]
    if (event.target.checked) {
      updatedList = [...checkedList, event.target.value]
    } else {
      updatedList.splice(checkedList.indexOf(event.target.value), 1)
    }
    setCheckedList(updatedList)
  }
  const isChecked = (id: string) => (checkedList.find((c) => c === id) ? true : false)
  const handleDelete = () =>
    dispatch(deleteClientsAsync(checkedList))
      .unwrap()
      .then((res) => {
        getClients()
        setAllRows(false)
        setCheckedList([])
      })
      .catch((err) => console.log(err))

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    getClients()
  }, [])

  if (status === 'loading') {
    return <LinearProgress aria-label="loading-client" />
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography color="primary" variant="h4">
          Listado de clientes
        </Typography>
        <Button onClick={handleOpen} size="large" startIcon={<Search />}>
          Buscar
        </Button>
      </Stack>
      <Fab
        onClick={() => go('/create')}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        color="primary"
        aria-label="add">
        <Add />
      </Fab>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width={120}>
                <Checkbox checked={allRows} onChange={handleAllChecked} />
              </TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell># Document</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell># Teléfono</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  Sin registros
                </TableCell>
              </TableRow>
            )}
            {data.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Checkbox value={row._id} onChange={handleChecked} checked={isChecked(row._id)} />
                  <Button color="warning" onClick={() => go(`/edit/${row._id}`)}>
                    <Edit />
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.names}
                </TableCell>
                <TableCell>{row.document}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {checkedList.length > 0 && (
        <Box>
          <Button onClick={handleDelete} color="error" variant="contained" startIcon={<Delete />}>
            Eliminar
          </Button>
        </Box>
      )}
      {open && <ModalSearch handleClose={handleClose} />}
    </Stack>
  )
}

export default List
