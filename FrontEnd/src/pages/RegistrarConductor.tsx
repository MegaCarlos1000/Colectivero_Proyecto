import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/RegistrarConductor.module.css';

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

        if (colectivoId === '') {
            setError('Por favor selecciona un colectivo.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:8000/api/registrar-conductor/',
                {
                    user: {
                        email,
                        password,
                    },
                    colectivo: colectivoId,
                },
                { headers: { Authorization: `Token ${token}` } }
            );

            navigate('/dashboard');
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data.user?.email?.join(', ') || 
                                     'Error al registrar el conductor';
                setError(`Error: ${errorMessage}`);
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <div>
            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <button 
                        className={styles.backButton} 
                        onClick={() => navigate(-1)} // Función para volver a la página anterior
                    >
                        &larr;
                    </button>
                    <h2>Registrar Conductor</h2>
                </div>
                <form onSubmit={handleSubmit}>
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
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.btnAdd}>Registrar</button>
                        <button type="button" className={styles.btnCancel} onClick={() => navigate('/dashboard')}>Cancelar</button>
                    </div>
                    {error && <p className={styles.errorText}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegistrarConductor;
