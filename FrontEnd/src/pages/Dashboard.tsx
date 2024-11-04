import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBus, FaUser, FaSignOutAlt, FaMoneyCheckAlt } from 'react-icons/fa';
import taxi from './img/taxi.png';
import styles from './css/Dashboard.module.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Mi Sistema</h1>
                <nav className={styles.navbar}>
                    <button className={styles.navButton} onClick={() => navigate('/RegistrarColectivos')}>
                        <FaBus /> Registrar Colectivos
                    </button>
                    <button className={styles.navButton} onClick={() => navigate('/RegistrarConductor')}>
                        <FaUser /> Registrar Conductor
                    </button>
                    <button className={styles.navButton} onClick={() => navigate('/RegistroPagos')}>
                        <FaMoneyCheckAlt /> Registro Pagos {/* Botón para Registro de Pagos */}
                    </button>
                    <button className={styles.navButton} onClick={() => navigate('/Reportes')}>
                        <FaMoneyCheckAlt /> Reportes {/* Botón para Registro de Pagos */}
                    </button>
                    <button className={styles.navButton} onClick={() => navigate('/Lista')}>
                        <FaHome /> Lista
                    </button>
                    <button className={styles.logoutButton} onClick={handleLogout}>
                        <FaSignOutAlt /> Cerrar Sesión
                    </button>
                </nav>
            </header>
            <div className={styles.content}>
                <h2 className={styles.title}>Bienvenido al sistema de colectivos línea 3</h2>
                <p className={styles.message}>¡Has iniciado sesión con éxito!</p>
                {/* Tarjeta de Animación de Taxi */}
                <div className={styles.card}>
                    <div className={styles.taxiAnimation}>
                        <img src={taxi} alt="Taxi" className={styles.taxiImage} />
                    </div>
                </div>
            </div>
            <nav className={styles.bottomMenu}>
                <button className={styles.bottomButton} onClick={() => navigate('/RegistrarColectivos')}>
                    <FaBus />
                </button>
                <button className={styles.bottomButton} onClick={() => navigate('/RegistrarConductor')}>
                    <FaUser />
                </button>
                <button className={styles.bottomButton} onClick={() => navigate('/RegistroPagos')}>
                    <FaMoneyCheckAlt /> {/* Botón para Registro de Pagos en el menú inferior */}
                </button>
                <button className={styles.bottomButton} onClick={() => navigate('/Lista')}>
                    <FaHome />
                </button>
                <button className={styles.bottomButton} onClick={handleLogout}>
                    <FaSignOutAlt />
                </button>
                <button className={styles.bottomButton} onClick={() => navigate('/Reportes')}>
                    <FaMoneyCheckAlt /> {/* Botón para Registro de Pagos en el menú inferior */}
                </button>
            </nav>
            <footer className={styles.footer}>
                <p>© 2024 MegaCompany. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
