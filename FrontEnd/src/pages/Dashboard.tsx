import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        navigate('/'); // Redirigir a la página de inicio de sesión
    };

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
            <p>¡Has iniciado sesión con éxito!</p>
            <div>
                <button onClick={() => navigate('/profile')}>Ver Perfil</button>
                <button onClick={() => navigate('/reports')}>Ver Reportes</button>
                <button onClick={() => navigate('/Conductor')}>Registrar Conductor</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Dashboard;
