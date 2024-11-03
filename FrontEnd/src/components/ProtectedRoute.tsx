import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element;
    // Puedes añadir otras props si las necesitas, como `path`
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const token = localStorage.getItem('token'); // Verifica si hay un token en el localStorage

    return token ? element : <Navigate to="/" />; // Redirige al inicio si no hay token
};

export default ProtectedRoute;

