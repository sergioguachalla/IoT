import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'; 
import { ProgressBar } from 'primereact/progressbar';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (response && response.success) {
            localStorage.setItem('info', JSON.stringify(response.data));
            setTimeout(() => {
                navigate('/home');
            }, 500);
        }
    }, [response]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/users/auth`, { username, password })
            .then((res) => {
                setIsLoading(false);
                setResponse(res.data);
            })
            .catch(() => {
                setIsLoading(false);
                setResponse({ success: false, message: "Error al iniciar sesión." });
            });
    };

    return (
        <div>
            <Navbar />
            <div className="login-form-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="p-fluid">
                    <div className="field">
                        <label htmlFor="username" className="block">Usuario</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingrese su usuario"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="password" className="block">Contraseña</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            placeholder="Ingrese su contraseña"
                            required
                            className="w-full"
                        />
                        {response && (
                            <Message
                                severity={response.success ? "success" : "error"}
                                text={response.message}
                            />
                        )}
                    </div>
                    <div className="mt-4">
                        {isLoading && <ProgressBar mode="indeterminate" />}
                        <Button label="Iniciar Sesión" type="submit" className="p-button-primary w-full" disabled={isLoading} />
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p>¿No estás registrado? <Link to="/signup" className="signup-link">Regístrate</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
