import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegistrarColectivo from './pages/RegistrarColectivo';
import RegistrarConductor from './pages/RegistrarConductor';
import ListarConductores from './pages/ListarConductores';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/RegistrarColectivos" element={<RegistrarColectivo />} />
                <Route path="/RegistrarConductor" element={<RegistrarConductor />} />
                <Route path="/Lista" element={<ListarConductores />} />
            </Routes>
        </Router>
    );
};

export default App;
