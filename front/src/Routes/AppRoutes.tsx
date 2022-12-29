import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ClientList from 'Views/Client/List'
import ClientForm from 'Views/Client/Form'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientList />} />
      <Route path="/create" element={<ClientForm />} />
      <Route path="/edit/:id" element={<ClientForm />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
