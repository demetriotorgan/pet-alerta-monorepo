// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';
import { PawPrint } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo">
                    <PawPrint />
                    <span className="logo-text">PetAlerta</span>
                </div>

                <div className="header-actions">
                    {user && (
                        <span className="user-name">Olá, {user.nome}</span>
                    )}
                    <button 
                        onClick={handleLogout}
                        className="btn-logout"
                        aria-label="Sair"
                    >
                        <svg 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span className="btn-text">Sair</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;