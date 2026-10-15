import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { listarUsuarios } from '../api/authApi';
import UsuarioCard from '../components/UsuarioCard';
import useUsuarios from '../hooks/useUsuarios';

const Home = () => {
  const {usuarios,loading, handleDelete} = useUsuarios();

  if (loading) {
        return (
            <>
                <Menu />
                <p>Carregando...</p>
            </>
        );
    }

  return (
    <>
    <Menu/>
     {usuarios.map((usuario) => (
                <UsuarioCard
                    key={usuario._id}
                    usuario={usuario}
                    onDelete={handleDelete}
                />
            ))}
    </>
  )
}

export default Home