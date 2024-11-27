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
         axios.post('http://localhost:8000/users/', formData).then((response) => {
            console.log(response.data);
            setResponse(response.data);
         });
        console.log('Form Data Submitted:', formData);
    };
    
         

    return (
        <>
            <Navbar />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 60px)', // Resta la altura de la barra de navegación
                    background: '#f5f5f5',
                    margin: 0,
                }}
            >
                <div
                    className="p-card p-shadow-3 p-p-4"
                    style={{
                        width: '400px',
                        borderRadius: '8px',
                        background: '#ffffff',
                    }}
                >
                    <h2
                        className="p-text-center p-mb-4"
                        style={{ color: '#333', fontWeight: 'bold' }}
                    >
                        Registrate en nuestra plataforma
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="p-field p-mb-3">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <InputText
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre de usuario"
                                className="p-inputtext-sm p-d-block"
                            />
                        </div>
                        <div className="p-field p-mb-3">
                            <label htmlFor="name">Nombres</label>
                            <InputText
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                className="p-inputtext-sm p-d-block"
                            />
                        </div>
                        <div className="p-field p-mb-3">
                            <label htmlFor="lastname">Apellidos</label>
                            <InputText
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Ingresa tus apellidos"
                                className="p-inputtext-sm p-d-block"
                            />
                        </div>
                        <div className="p-field p-mb-3">
                            <label htmlFor="email">Email</label>
                            <InputText
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu email"
                                className="p-inputtext-sm p-d-block"
                            />
                        </div>
                        <div className="p-field p-mb-3" style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="password">Contraseña</label>
                            <Password
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                toggleMask
                                placeholder="Ingresa tu contraseña"
                                feedback={false}
                                className="p-inputtext-sm p-d-block"
                            />
                        </div>
                        <Button
                            type="submit"
                            label="Registrarse"
                            className="p-mt-3 p-py-2 p-px-4 p-button-rounded"
                            style={{
                                width: '100%',
                                backgroundColor: '#6C63FF',
                                border: 'none',
                            }}
                        />
                        {response && response.success && (<Message severity="success" text={response.message} />
                        )}
                        {response && !response.success && (<Message severity="error" text={response.message} />
                        )}
                    </form>
                </div>
            </div>
        </>
      );
   }

export default Signup;
