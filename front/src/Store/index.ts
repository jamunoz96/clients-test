import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import clientReducer from 'Store/Slices/client'

const reducer = {
  client: clientReducer,
}

export const store = configureStore({ reducer })
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
