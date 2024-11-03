// src/pages/RegistrarColectivo.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarColectivo: React.FC = () => {
    const [patente, setPatente] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState<number | ''>('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8000/api/registrar-colectivo/',
                { patente, modelo, anio },
                { headers: { Authorization: `Token ${token}` } }
            );
            navigate('/dashboard');
        } catch (err) {
            setError('Error al registrar el colectivo');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Colectivo</h2>
            <div>
                <label>Patente:</label>
                <input type="text" value={patente} onChange={(e) => setPatente(e.target.value)} required />
            </div>
            <div>
                <label>Modelo:</label>
                <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
            </div>
            <div>
                <label>Año:</label>
                <input type="number" value={anio} onChange={(e) => setAnio(Number(e.target.value))} required />
            </div>
            <button type="submit">Registrar</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegistrarColectivo;
