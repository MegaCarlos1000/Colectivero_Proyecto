import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/RegistroPagoForm.module.css';

interface User {
    email: string;
}

interface Conductor {
    id: number;
    user: User;
}

const RegistroPagoForm: React.FC = () => {
    const [conductores, setConductores] = useState<Conductor[]>([]);
    const [conductor, setConductor] = useState<number | ''>('');
    const [fecha, setFecha] = useState<string>('');
    const [trabajoStatus, setTrabajoStatus] = useState<'worked' | 'not_worked'>('not_worked');
    const [pagoRealizado, setPagoRealizado] = useState<boolean>(false);
    const [mensaje, setMensaje] = useState<string>('');

    useEffect(() => {
        const fetchConductores = async () => {
            try {
                const response = await axios.get<Conductor[]>('http://127.0.0.1:8000/api/conductores/');
                setConductores(response.data);
            } catch (error) {
                console.error('Error al cargar conductores:', error);
            }
        };

        fetchConductores();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registroPago = {
            conductor,
            fecha,
            trabajo_status: trabajoStatus,
            pago_realizado: pagoRealizado,
        };

        try {
            await axios.post('http://127.0.0.1:8000/api/registro_pagos/', registroPago);
            setMensaje('Registro de pago creado exitosamente.');
            setConductor('');
            setFecha('');
            setTrabajoStatus('not_worked');
            setPagoRealizado(false);
        } catch (error) {
            console.error('Error al registrar pago:', error);
            setMensaje('Error al registrar el pago.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formHeader}>Registrar Pago</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="conductor">Conductor:</label>
                    <select
                        id="conductor"
                        className={styles.selectInput}
                        value={conductor}
                        onChange={(e) => setConductor(Number(e.target.value))}
                        required
                    >
                        <option value="">Seleccione un conductor</option>
                        {conductores.map((conductor) => (
                            <option key={conductor.id} value={conductor.id}>
                                {conductor.user.email}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="fecha">Fecha:</label>
                    <input
                        type="date"
                        id="fecha"
                        className={styles.textInput}
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>¿Trabajó?</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="worked"
                                checked={trabajoStatus === 'worked'}
                                onChange={(e) => setTrabajoStatus(e.target.value as 'worked')}
                            />
                            Sí
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="not_worked"
                                checked={trabajoStatus === 'not_worked'}
                                onChange={(e) => setTrabajoStatus(e.target.value as 'not_worked')}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={pagoRealizado}
                            onChange={(e) => setPagoRealizado(e.target.checked)}
                        />
                        Pago Realizado
                    </label>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.btnAdd}>Registrar Pago</button>
                </div>
            </form>
            {mensaje && <p className={styles.errorText}>{mensaje}</p>}
        </div>
    );
};

export default RegistroPagoForm;
