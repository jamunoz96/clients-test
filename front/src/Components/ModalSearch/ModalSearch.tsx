import { FC, useState } from 'react'
import { Search } from '@mui/icons-material'
import {
  Avatar,
  CardContent,
  InputAdornment,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from 'Hooks/useApp'
import { searchClientsAsync } from 'Store/Actions/client'
import { selectClient } from 'Store/Slices/client'
import { IClient } from 'Types/IClient'
import { useNavigate } from 'react-router'

type IModalSearch = {
  handleClose: (val: boolean) => void
}

const style = {
  position: 'absolute' as const,
  top: '22%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
}

const ModalSearch: FC<IModalSearch> = ({ handleClose }) => {
  const dispatch = useAppDispatch()
  const { searching } = useAppSelector(selectClient)
  const [results, setResult] = useState([])
  const go = useNavigate()

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      dispatch(searchClientsAsync(event.target.value))
        .unwrap()
        .then(({ data }) => setResult(data))
        .catch((err) => {
          setResult([])
          console.log(err)
        })
    } else {
      setResult([])
    }
  }

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Paper sx={style}>
        <TextField
          fullWidth
          placeholder="Buscar cliente..."
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <CardContent>
          {searching === 'loading' && <LinearProgress aria-label="loading-search" />}
          {results.length === 0 && (
            <ListItem>
              <Typography>Sin resultados</Typography>
            </ListItem>
          )}
          {results.map((c: IClient) => (
            <ListItemButton onClick={() => go(`/edit/${c._id}`)} key={c._id}>
              <ListItemText primary={c.names} secondary={c.document} />
            </ListItemButton>
          ))}
        </CardContent>
      </Paper>
    </Modal>
  )
}

export default ModalSearch
