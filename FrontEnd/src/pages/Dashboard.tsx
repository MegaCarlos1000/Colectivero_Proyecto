import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/Dashboard.module.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate('/'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.title}>Bienvenido al Dashboard</h1>
            <p className={styles.message}>¡Has iniciado sesión con éxito!</p>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => navigate('/RegistrarColectivos')}>Registrar Colectivos</button>
                <button className={styles.button} onClick={() => navigate('/RegistrarConductor')}>Registrar Conductor</button>
                <button className={styles.button} onClick={() => navigate('/Lista')}>Lista</button>
                <button className={styles.button} onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Dashboard;
