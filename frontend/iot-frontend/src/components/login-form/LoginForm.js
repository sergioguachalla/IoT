import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom'; // Asegúrate de usar React Router
import './LoginForm.css';
import { ProgressBar } from 'primereact/progressbar';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Logging in with', { username, password });
        setIsLoading(true);
    };

    return (
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
                <div className="field mt-4">
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
                </div>
                <div className="mt-4" style={{ position: 'relative' }}>
                    {isLoading &&
                        <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                    }
                        <Button label="Iniciar Sesión" type="submit" className="p-button-primary w-full"  disabled="{isLoading}" />
                </div>
            </form>
            <div className="mt-4 text-center">
                <p>¿No estás registrado? <Link to="/signup" className="signup-link">Regístrate</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
