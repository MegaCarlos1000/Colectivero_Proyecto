import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/ReporteMensual.module.css';

interface User {
    email: string;
}

interface Conductor {
    id: number;
    user: User;
}

interface RegistroPago {
    id: number;
    conductor: number;
    fecha: string;
    tarifa_pagada: string;
    trabajo_status: string;
}

interface ReporteMensual {
    total_ideal: number;
    total_real: number;
    diferencia: number;
    registros: RegistroPago[];
}

const ReporteMensual: React.FC = () => {
    const [conductores, setConductores] = useState<Conductor[]>([]);
    const [selectedConductor, setSelectedConductor] = useState<number | ''>('');
    const [reporte, setReporte] = useState<ReporteMensual | null>(null);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        const fetchConductores = async () => {
            try {
                const response = await axios.get<Conductor[]>('http://127.0.0.1:8000/api/conductores/');
                setConductores(response.data);
            } catch (error) {
                console.error('Error al cargar conductores:', error);
                setMensaje('Error al cargar conductores.');
            }
        };

        fetchConductores();
    }, []);

    const handleConductorChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const conductorId = Number(e.target.value);
        setSelectedConductor(conductorId);
        
        if (conductorId) {
            try {
                const response = await axios.get<ReporteMensual>(`http://127.0.0.1:8000/api/reportes-mensuales/?conductor=${conductorId}`);
                setReporte(response.data);
                setMensaje('');
            } catch (error) {
                console.error('Error al obtener el reporte mensual:', error);
                setMensaje('Error al obtener el reporte mensual.');
                setReporte(null);
            }
        } else {
            setReporte(null);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Reporte Mensual</h2>
            <div className={styles.selectContainer}>
                <label htmlFor="conductor">Selecciona un Conductor:</label>
                <select id="conductor" value={selectedConductor} onChange={handleConductorChange}>
                    <option value="">Seleccione un conductor</option>
                    {conductores.map((conductor) => (
                        <option key={conductor.id} value={conductor.id}>
                            {conductor.user.email}
                        </option>
                    ))}
                </select>
            </div>
            {mensaje && <p className={styles.message}>{mensaje}</p>}
            {reporte && (
                <div className={styles.report}>
                    <h3>Datos del Mes</h3>
                    <p>Total Ideal: ${reporte.total_ideal}</p>
                    <p>Total Real: ${reporte.total_real}</p>
                    <p>Diferencia: ${reporte.diferencia}</p>
                    <h4>Registros</h4>
                    <ul className={styles.registros}>
                        {reporte.registros.map((registro) => (
                            <li key={registro.id} className={styles.registroItem}>
                                <p>Fecha: {registro.fecha}</p>
                                <p>Tarifa Pagada: ${registro.tarifa_pagada}</p>
                                <p>Trabajo Status: {registro.trabajo_status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ReporteMensual;
