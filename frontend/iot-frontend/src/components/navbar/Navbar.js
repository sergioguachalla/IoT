import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useState } from 'react';


const Navbar = () => {
    const [info, setInfo] = useState(null);
    useEffect(() => {
        const info = localStorage.getItem('info');
        setInfo(info ? JSON.parse(info) : null);
    }, []);
    const item = info ? {label: info.username, action: () => window.location.href = "/profile"} : {label: 'Iniciar Sesión', command: () => window.location.href = "/login-form"};
    const items = [
        { label: 'Inicio', icon: 'pi pi-home', command: () => window.location.href = "/" },
        { label: 'Registrar', icon: 'pi pi-star',
            items: [
                { label: 'Carro', icon: 'pi pi-info', command: () => window.location.href = "/feature1" },
                { label: 'Parqueo', icon: 'pi pi-info-circle', command: () => window.location.href = "/feature2" }
            ]
        },
        { label: 'Registrarse', icon: 'pi pi-info', command: () => window.location.href = "/login-form" },
        {label: item.label, icon: 'pi pi-user', command: () => 
            {
                if (info) {
                    window.location.href = "/profile";
                } else {
                    window.location.href = "/login-form";
                }
            }   
        }
        
    ];

    

    const end = <button className="p-button p-component p-button-rounded p-button-secondary">
        <i className="pi pi-user"></i>
    </button>;

    return (
        <Menubar model={items} end={end} />
    );
};

export default Navbar;
