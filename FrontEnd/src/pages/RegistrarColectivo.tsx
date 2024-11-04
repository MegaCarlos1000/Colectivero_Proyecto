import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/RegistrarColectivo.module.css';

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
        <div>
            <div className={styles.headerBar}>
                <input
                    type="text"
                    placeholder="Buscar vehículo por (Patente, Dueño o Modelo)"
                    className={styles.searchInput}
                />
                <div className={styles.profileIcon}></div>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <button className={styles.backButton}>&larr;</button>
                    <h2 className={styles.title}>Agregar Colectivo Nuevo</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>Patente:</label>
                    <input
                        type="text"
                        value={patente}
                        onChange={(e) => setPatente(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <label className={styles.label}>Modelo:</label>
                    <input
                        type="text"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                        className={styles.input}
                    />

                    <label className={styles.label}>Año:</label>
                    <input
                        type="number"
                        value={anio}
                        onChange={(e) => setAnio(Number(e.target.value))}
                        required
                        className={styles.input}
                    />

                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.btnAdd}>Agregar</button>
                        <button type="button" className={styles.btnCancel}>Cancelar</button>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RegistrarColectivo;
