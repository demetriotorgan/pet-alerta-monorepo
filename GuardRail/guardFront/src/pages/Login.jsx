import React, { useEffect, useState } from 'react'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import useLogin from '../hooks/useLogin';

const Login = () => {   
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth(); 

    const {handleChange, handleSubmit,erro,formData,carregando} = useLogin();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/app', { replace: true });
        }
    }, [isAuthenticated, navigate]);

     // Se já tá logado, manda pro /app
    if (isAuthenticated) {        
        return null;
    }

    return (
     <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h1>Guard Rail</h1>
                    <small>PetAlerta</small>                    
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {erro && <div className="error-message">{erro}</div>}

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={carregando}
                            placeholder="seu@email.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                            disabled={carregando}
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-login"
                        disabled={carregando}
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Guard Rail - PetAlerta</p>
                </div>
            </div>
        </div>
  )
}

export default Login