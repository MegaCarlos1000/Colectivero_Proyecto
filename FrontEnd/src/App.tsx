import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegistrarColectivo from './pages/RegistrarColectivo';
import RegistrarConductor from './pages/RegistrarConductor';
import ListarConductores from './pages/ListarConductores';
import RegistroPagoForm  from './pages/RegistroPagoForm'; // Asegúrate de importar el componente
import ReporteMensual from './pages/ReporteMensual';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/RegistrarColectivos" element={<RegistrarColectivo />} />
                <Route path="/RegistrarConductor" element={<RegistrarConductor />} />
                <Route path="/Lista" element={<ListarConductores />} />
                <Route path="/RegistroPagos" element={<RegistroPagoForm />} /> {/* Nueva ruta para Registro de Pagos */}
                <Route path="/Reportes" element={<ReporteMensual />} /> {/* Nueva ruta para Registro de Pagos */}
            </Routes>
        </Router>
    );
};

export default App;