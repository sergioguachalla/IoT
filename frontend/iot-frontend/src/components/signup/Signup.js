import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { Message } from 'primereact/message';
import { useNavigate } from 'react-router-dom';

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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 60px)',
                    background: '#f9f9f9',
                    padding: '1rem',
                }}
            >
                <div
                    className="p-card p-shadow-3 p-p-4"
                    style={{
                        width: '500px',
                        borderRadius: '12px',
                        background: '#fff',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h2
                        className="p-text-center"
                        style={{
                            color: '#333',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            marginBottom: '2rem',
                            textAlign: 'center',
                        }}
                    >
                        Regístrate en nuestra plataforma
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/** Estilo de los campos en fila */}
                        <div className="p-field p-mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label
                                htmlFor="username"
                                style={{ fontWeight: '500', color: '#555', width: '120px', textAlign: 'right', marginRight: '1rem' }}
                            >
                                Usuario:
                            </label>
                            <InputText
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre de usuario"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div className="p-field p-mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label
                                htmlFor="name"
                                style={{ fontWeight: '500', color: '#555', width: '120px', textAlign: 'right', marginRight: '1rem' }}
                            >
                                Nombres:
                            </label>
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div className="p-field p-mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label
                                htmlFor="lastname"
                                style={{ fontWeight: '500', color: '#555', width: '120px', textAlign: 'right', marginRight: '1rem' }}
                            >
                                Apellidos:
                            </label>
                            <InputText
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Ingresa tus apellidos"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div className="p-field p-mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label
                                htmlFor="email"
                                style={{ fontWeight: '500', color: '#555', width: '120px', textAlign: 'right', marginRight: '1rem' }}
                            >
                                Email:
                            </label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu email"
                                style={{ flex: 1 }}
                            />
                        </div>
                        <div className="p-field p-mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label
                                htmlFor="password"
                                style={{ fontWeight: '500', color: '#555', width: '120px', textAlign: 'right', marginRight: '1rem' }}
                            >
                                Contraseña:
                            </label>
                            <Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                toggleMask
                                placeholder="Ingresa tu contraseña"
                                feedback={false}
                                style={{ flex: 1 }}
                            />
                        </div>
                        <Button
                            type="submit"
                            label="Registrarse"
                            className="p-mt-3"
                            style={{
                                width: '100%',
                                backgroundColor: '#6C63FF',
                                border: 'none',
                                color: '#fff',
                                fontSize: '1rem',
                                padding: '0.75rem',
                                borderRadius: '8px',
                            }}
                        />
                        {response && response.success && (
                            <Message
                                severity="success"
                                text={response.message}
                                style={{ marginTop: '1rem', textAlign: 'center' }}
                            />
                        )}
                        {response && !response.success && (
                            <Message
                                severity="error"
                                text={response.message}
                                style={{ marginTop: '1rem', textAlign: 'center' }}
                            />
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
