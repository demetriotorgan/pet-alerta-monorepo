// src/components/Usuario.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import api from '../api/axios'; // teu axios configurado
import './Usuario.css';
import { cadastrarUsuario } from '../api/authApi';

const Usuario = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cargo: 'MODERADOR',
        ativo: true
    });

    const validate = () => {
        const newErrors = {};

        // Nome: required, 3-80 chars
        if (!formData.nome.trim()) {
            newErrors.nome = 'O nome é obrigatório';
        } else if (formData.nome.trim().length < 3) {
            newErrors.nome = 'Mínimo 3 caracteres';
        } else if (formData.nome.trim().length > 80) {
            newErrors.nome = 'Máximo 80 caracteres';
        }

        // Email: required, formato válido
        if (!formData.email.trim()) {
            newErrors.email = 'O email é obrigatório';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'E-mail inválido';
        }

        // Senha: required, min 6 chars
        if (!formData.senha) {
            newErrors.senha = 'A senha é obrigatória';
        } else if (formData.senha.length < 6) {
            newErrors.senha = 'Mínimo 6 caracteres';
        }

        // Confirmar senha
        if (formData.senha!== formData.confirmarSenha) {
            newErrors.confirmarSenha = 'As senhas não conferem';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
           ...prev,
            [name]: type === 'checkbox'? checked : value
        }));

        // Limpa erro do campo ao digitar
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                nome: formData.nome.trim(),
                email: formData.email.toLowerCase().trim(),
                senha: formData.senha,
                cargo: formData.cargo,
                ativo: formData.ativo
            };

            await cadastrarUsuario(payload);

            alert('Usuário cadastrado com sucesso!');
            navigate('/app');
        } catch (error) {
            const msg = error.response?.data?.message || 'Erro ao cadastrar usuário';
            alert(msg);

            // Se erro de email duplicado
            if (error.response?.status === 409) {
                setErrors({ email: 'Este email já está cadastrado' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="usuario-page">
            <div className="usuario-header">
                <button
                    onClick={() => navigate('/app')}
                    className="btn-voltar"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </button>
                <h1 className="usuario-title">
                    <UserPlus size={28} />
                    Cadastrar Usuário
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="usuario-form">
                <div className="form-group">
                    <label htmlFor="nome">Nome *</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        disabled={loading}
                        className={errors.nome? 'input-error' : ''}
                        
                    />
                    {errors.nome && <span className="error-text">{errors.nome}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="usuario@email.com"
                        disabled={loading}
                        className={errors.email? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="senha">Senha *</label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Mínimo 6 caracteres"
                            disabled={loading}
                            className={errors.senha? 'input-error' : ''}
                        />
                        {errors.senha && <span className="error-text">{errors.senha}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarSenha">Confirmar Senha *</label>
                        <input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            placeholder="Repita a senha"
                            disabled={loading}
                            className={errors.confirmarSenha? 'input-error' : ''}
                        />
                        {errors.confirmarSenha && <span className="error-text">{errors.confirmarSenha}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="cargo">Cargo *</label>
                        <select
                            id="cargo"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="MODERADOR">Moderador</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <div className="form-group form-checkbox">
                        <label className="checkbox-label">
                            <input
                                name="ativo"
                                type="checkbox"
                                checked={formData.ativo}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <span>Usuário Ativo</span>
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate('/app')}
                        className="btn-cancelar"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-salvar"
                        disabled={loading}
                    >
                        {loading? 'Salvando...' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Usuario;