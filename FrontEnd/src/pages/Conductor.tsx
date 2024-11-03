import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterConductor: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [colectivoPatente, setColectivoPatente] = useState('');
    const [modelo, setModelo] = useState('');
    const [anio, setAnio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            // Primero, crea el colectivo
            const colectivoResponse = await axios.post('http://localhost:8000/api/colectivos/', {
                patente: colectivoPatente,
                modelo,
                anio,
            });

            const colectivoId = colectivoResponse.data.id; // Suponiendo que tu API devuelve el ID del colectivo

            // Luego, crea el usuario y conductor
            await axios.post('http://localhost:8000/api/conductores/', {
                email,
                password,
                colectivo: colectivoId,
            });

            // Redirige después de registrar
            navigate('/dashboard');
        } catch (err) {
            setError('Error al registrar el conductor. Verifica los datos.');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="colectivoPatente">Patente del Colectivo:</label>
                <input
                    type="text"
                    id="colectivoPatente"
                    value={colectivoPatente}
                    onChange={(e) => setColectivoPatente(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="modelo">Modelo del Colectivo:</label>
                <input
                    type="text"
                    id="modelo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="anio">Año del Colectivo:</label>
                <input
                    type="number"
                    id="anio"
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Registrar Conductor</button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Estilo opcional para error */}
        </form>
    );
};

export default RegisterConductor;
