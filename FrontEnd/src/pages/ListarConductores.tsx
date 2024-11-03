import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const fetchConductores = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/conductores/', {
                    headers: { Authorization: `Token ${token}` },
                    timeout: 5000, // Ajuste del tiempo de espera
                });
                setConductores(response.data);
            } catch (err) {
                setError('Error al obtener la lista de conductores');
                console.error(err);
            }
        };
        fetchConductores();
    }, []);

    return (
        <div>
            <h2>Lista de Conductores</h2>
            {error && <p>{error}</p>}
            <ul>
                {conductores.map((conductor) => (
                    <li key={conductor.id}>
                        {conductor.user.email} - Colectivo: {conductor.colectivo.patente} ({conductor.colectivo.modelo})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarConductores;
