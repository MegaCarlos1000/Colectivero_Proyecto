import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/ListarConductores.module.css';

interface Conductor {
    id: number;
    user: {
        email: string;
    };
    colectivo: {
        id: number;
        patente: string;
        modelo: string;
    };
}

const ListarConductores: React.FC = () => {
    const [conductores, setConductores] = useState<Conductor[]>([]);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConductores = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/conductores/', {
                    headers: { Authorization: `Token ${token}` },
                    timeout: 5000,
                });
                setConductores(response.data);
            } catch (err) {
                setError('Error al obtener la lista de conductores');
                console.error(err);
            }
        };
        fetchConductores();
    }, []);

    const handleEdit = (id: number) => {
        console.log(`Edit conductor with id: ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete conductor with id: ${id}`);
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerBar}>
                <h2>Lista de Conductores</h2>
                <div className={styles.profileIcon}></div>
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <ul className={styles.conductorList}>
                {conductores.map((conductor) => (
                    <li key={conductor.id} className={styles.conductorItem}>
                        <div className={styles.conductorInfo}>
                            {conductor.user.email} - Colectivo: {conductor.colectivo.patente} ({conductor.colectivo.modelo})
                        </div>
                        <div className={styles.conductorActions}>
                            <button className={styles.editButton} onClick={() => handleEdit(conductor.id)}>Edit</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(conductor.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className={styles.backButton} onClick={handleBack}>← Volver</button>
        </div>
    );
};

export default ListarConductores;
