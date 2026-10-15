// src/components/UsuarioCard.jsx
import React, { useState } from 'react';
import { User, Shield, ShieldCheck, Mail, Clock, Circle, Trash2 } from 'lucide-react';
import './UsuarioCard.css';
import formatarData from '../utils/formatarData';


const UsuarioCard = ({ usuario, onDelete }) => {
    const { _id, nome, email, cargo, ativo, ultimoLogin} = usuario;
    const [deleting, setDeleting] = useState(false);

    const handleClickDelete = async() =>{
        if(!window.confirm(`Deseja excluir ${nome}`)) return
        setDeleting(true);
        try {
            await onDelete(_id)
            alert('Usuário excluido com sucesso')
        } catch (error) {
            alert('Erro ao deletar usuário')
        }finally{
            setDeleting(false);
        }
    }

    return (
        <div className={`usuario-card ${!ativo ? 'inativo' : ''}`}>
            <div className="usuario-card-header">
                <div className="usuario-avatar">
                    <User size={24} />
                </div>
                
                <div className="usuario-info-principal">
                    <h3 className="usuario-nome">{nome}</h3>
                    <span className={`badge-cargo ${cargo.toLowerCase()}`}>
                        {cargo === 'ADMIN' ? <ShieldCheck size={14} /> : <Shield size={14} />}
                        {cargo}
                    </span>
                </div>

                <div className="usuario-status">
                    <Circle 
                        size={10} 
                        className={`status-dot ${ativo ? 'ativo' : 'inativo'}`}
                        fill={ativo ? 'var(--success)' : 'var(--secondary)'}
                    />
                    <span>{ativo ? 'Ativo' : 'Inativo'}</span>
                </div>
                <button 
                        className="btn-excluir"
                        onClick={handleClickDelete}
                        disabled={deleting}
                        aria-label="Excluir usuário"
                    >
                        <Trash2 size={18} />
                    </button>
            </div>

            <div className="usuario-card-body">
                <div className="usuario-item">
                    <Mail size={16} />
                    <span>{email}</span>
                </div>
                <div className="usuario-item">
                    <Clock size={16} />
                    <span>Último login: {formatarData(ultimoLogin)}</span>                    
                </div>                
            </div>
        </div>
    );
};

export default UsuarioCard;