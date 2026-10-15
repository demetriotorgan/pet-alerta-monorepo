import React from 'react'
import Dashboard from '../pages/Dashboard'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import PrivateRoute from './PrivateRoute'
import Home from '../pages/Home'
import Usuario from '../components/Usuario'
import AprovarPet from '../components/AprovarPet'
import ListarPets from '../components/ListarPets'
import EstadosPets from '../components/EstadosPets'

const Router = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />

                    {/* Rotas protegidas dentro do Dashboard */}
                    <Route path='/app' element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }>
                        <Route index element={<Home />} />
                        <Route path='novo' element={<Usuario />} />
                        <Route path='aprovar' element={<AprovarPet />} />
                        <Route path='pets' element={<ListarPets />} />
                        <Route path='estados' element={<EstadosPets />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Router