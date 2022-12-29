export type IClient = {
  _id: string
  names: string
  document: number
  address: string
  phone: number
}

export type IStateClient = {
  data: IClient[] | []
  status: 'idle' | 'loading' | 'failed'
  searching: 'idle' | 'loading' | 'failed'
}
