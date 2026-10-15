import { useState } from "react";
import { useAuth } from "./useAuth";
import { loginUsuario } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function useLogin(){
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    
    const { login } = useAuth();
     const navigate = useNavigate();

     const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            console.log(formData.email,formData.senha)
            await login(formData.email, formData.senha);
            navigate('/app');
        } catch (error) {
            setErro(error.response?.data?.erro || 'Email ou senha inválidos');
        } finally {
            setCarregando(false);
        }
    };

    return {
        handleChange,
        handleSubmit,
        erro,
        carregando,
        formData
    }
}