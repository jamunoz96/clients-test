import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { RootState } from 'Store'
import {
  deleteClientsAsync,
  getClientAsync,
  getClientsAsync,
  saveClientAsync,
  searchClientsAsync,
  updateClientAsync,
} from 'Store/Actions/client'
import { IStateClient } from 'Types/IClient'

export const CLIENT_INITIAL_STATE: IStateClient = {
  status: 'idle',
  searching: 'idle',
  data: [],
}

export const clientSlice = createSlice({
  name: 'client',
  initialState: CLIENT_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientsAsync.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.data = payload.data
      })
      .addCase(getClientAsync.fulfilled, (state) => {
        state.status = 'idle'
      })
      .addCase(searchClientsAsync.pending, (state) => {
        state.searching = 'loading'
      })
      .addCase(searchClientsAsync.fulfilled, (state) => {
        state.searching = 'idle'
      })
      .addCase(getClientsAsync.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(searchClientsAsync.rejected, (state) => {
        state.searching = 'failed'
      })
      .addMatcher(
        isAnyOf(
          getClientsAsync.pending,
          getClientAsync.pending,
          saveClientAsync.pending,
          updateClientAsync.pending,
          deleteClientsAsync.pending
        ),
        (state) => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        isAnyOf(
          getClientsAsync.rejected,
          getClientAsync.rejected,
          saveClientAsync.rejected,
          updateClientAsync.rejected,
          deleteClientsAsync.rejected
        ),
        (state) => {
          state.status = 'failed'
        }
      )
  },
})

export const selectClient = (state: RootState) => state.client

export default clientSlice.reducer
