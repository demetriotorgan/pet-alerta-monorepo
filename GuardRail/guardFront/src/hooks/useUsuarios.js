import { useEffect, useState } from "react";
import { deletarUsuario, listarUsuarios } from "../api/authApi";

export default function useUsuarios() {
    const [usuarios, setUsuarios] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const data = await listarUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error('Erro ao listar usuarios');
            } finally {
                setLoading(false);
            }
        }
        carregarUsuarios();
    }, []);

    const handleDelete = async(id)=>{
        await deletarUsuario(id)
        setUsuarios(prev => prev.filter(u => u._id !==id))
    };

    return{
        usuarios,
        loading,
        handleDelete
    }
}