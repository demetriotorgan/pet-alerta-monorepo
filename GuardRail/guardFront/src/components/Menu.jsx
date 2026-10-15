// src/components/Menu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ShieldCheck, List, RefreshCw } from 'lucide-react';
import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            id: 1,
            label: 'Criar Usuário',
            icon: UserPlus,
            path: '/app/novo',
            color: 'primary'
        },
        {
            id: 2,
            label: 'Aprovar Pet',
            icon: ShieldCheck,
            path: '/app/aprovar',
            color: 'success'
        },
        {
            id: 3,
            label: 'Listar Pets',
            icon: List,
            path: '/app/pets',
            color: 'warning'
        },
        {
            id: 4,
            label: 'Alterar Estado',
            icon: RefreshCw,
            path: '/app/estados',
            color: 'secondary'
        }
    ];

    return (
        <div className="menu">
            <div className="menu-header">
                <h2 className="menu-title"><ShieldCheck /> Guard Rail</h2>
                <p className="menu-subtitle">Selecione uma opção SIM ou NÃO?</p>
            </div>

            <div className="menu-grid">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`menu-card menu-card-${item.color}`}
                        >
                            <div className="menu-icon">
                                <Icon size={32} strokeWidth={1.5} />
                            </div>
                            <span className="menu-label">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Menu;