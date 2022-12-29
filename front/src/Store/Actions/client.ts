import { createAsyncThunk } from '@reduxjs/toolkit'
import ClientService from 'Services/ClientService'

export const getClientsAsync = createAsyncThunk('client/getAll', async () => {
  const { data } = await ClientService.getClients()
  return data
})

export const getClientAsync = createAsyncThunk('client/getById', async (id: string) => {
  const { data } = await ClientService.getClient(id)
  return data
})

export const saveClientAsync = createAsyncThunk('client/save', async (body: any) => {
  const { data } = await ClientService.saveClient(body)
  return data
})

export const updateClientAsync = createAsyncThunk('client/save', async (body: any) => {
  const { _id, ...restBody } = body
  const { data } = await ClientService.updateClient(_id, restBody)
  return data
})

export const deleteClientsAsync = createAsyncThunk('client/delete', async (ids: string[]) => {
  const { data } = await ClientService.deleteClient(ids)
  return data
})

export const searchClientsAsync = createAsyncThunk('client/search', async (query: string) => {
  const { data } = await ClientService.searchClients(query)
  return data
})
