// src/pages/RegistrarConductor.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrarConductor: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [colectivoId, setColectivoId] = useState<number | ''>('');
    const [colectivos, setColectivos] = useState<any[]>([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchColectivos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/colectivos/', {
                    headers: { Authorization: `Token ${token}` },
                });
                setColectivos(response.data);
            } catch (err) {
                console.error('Error fetching colectivos:', err);
            }
        };
        fetchColectivos();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validar que el ID del colectivo no esté vacío antes de enviar
        if (colectivoId === '') {
            setError('Por favor selecciona un colectivo.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/api/registrar-conductor/',
                {
                    user: {
                        email,
                        password,
                    },
                    colectivo: colectivoId, // ID del colectivo seleccionado
                },
                { headers: { Authorization: `Token ${token}` } }
            );

            navigate('/dashboard');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Mostrar el error completo
                console.error('Error response data:', err.response.data);
                const errorMessage = err.response.data.user?.email?.join(', ') || 
                                     'Error al registrar el conductor';
                setError(`Error: ${errorMessage}`);
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Conductor</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Colectivo:</label>
                <select
                    value={colectivoId}
                    onChange={(e) => setColectivoId(Number(e.target.value))}
                    required
                >
                    <option value="">Selecciona un colectivo</option>
                    {colectivos.map((colectivo) => (
                        <option key={colectivo.id} value={colectivo.id}>
                            {colectivo.patente} - {colectivo.modelo}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Registrar</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegistrarConductor;
