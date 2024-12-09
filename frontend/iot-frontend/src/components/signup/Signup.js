import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (response && response.success) {
            setTimeout(() => {
                navigate('/login');
            }, 500);
        }
    }, [response]);

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/users/`, formData).then((response) => {
            setResponse(response.data);
        });
    };

    return (
        <>
            <Navbar />
            <div className="signup-container">
                <div className="signup-card">
                    <h2>Regístrate en nuestra plataforma</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="signup-field">
                            <label htmlFor="username">Usuario:</label>
                            <InputText
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre de usuario"
                            />
                        </div>
                        <div className="signup-field">
                            <label htmlFor="name">Nombres:</label>
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                            />
                        </div>
                        <div className="signup-field">
                            <label htmlFor="lastname">Apellidos:</label>
                            <InputText
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Ingresa tus apellidos"
                            />
                        </div>
                        <div className="signup-field">
                            <label htmlFor="email">Email:</label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu email"
                            />
                        </div>
                        <div className="signup-field">
                            <label htmlFor="password">Contraseña:</label>
                            <Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                toggleMask
                                placeholder="Ingresa tu contraseña"
                                feedback={false}
                            />
                        </div>
                        <Button type="submit" label="Registrarse" className="signup-button" />
                        {response && response.success && (
                            <Message severity="success" text={response.message} className="signup-message" />
                        )}
                        {response && !response.success && (
                            <Message severity="error" text={response.message} className="signup-message" />
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
