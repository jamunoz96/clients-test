import { Container } from '@mui/system'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from 'Routes/AppRoutes'
import { store } from 'Store'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container maxWidth="lg" sx={{ marginTop: 10 }}>
          <AppRoutes />
        </Container>
      </BrowserRouter>
    </Provider>
  )
}

export default App
