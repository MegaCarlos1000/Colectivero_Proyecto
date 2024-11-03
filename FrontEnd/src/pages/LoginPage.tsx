import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './css/LoginPage.module.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Para redirección después del login

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password,
            });

            // Almacena el token en localStorage
            localStorage.setItem('token', response.data.token); // Ajusta según tu respuesta

            // Redirige al usuario después de iniciar sesión
            navigate('/dashboard'); // Cambia '/dashboard' a la ruta deseada

        } catch (err) {
            setError('Error en el login, verifica tus credenciales');
            console.error(err);
        }
    };

    return (
        <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.h2}>Iniciar Sesión</h2>
                <div>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="password">Contraseña:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">Iniciar Sesión</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
