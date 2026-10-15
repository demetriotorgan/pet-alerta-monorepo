// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p className="footer-title">PetAlerta</p>
                    <p className="footer-subtitle">Guard Rail</p>
                    <p className="footer-copy">
                        © {currentYear} 1 TDS - 2026 - SIM OU NÃO
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;