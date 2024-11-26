import React from 'react';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
    const items = [
        { label: 'Inicio', icon: 'pi pi-home', command: () => window.location.href = "/" },
        { label: 'Registrar', icon: 'pi pi-star',
            items: [
                { label: 'Carro', icon: 'pi pi-info', command: () => window.location.href = "/feature1" },
                { label: 'Parqueo', icon: 'pi pi-info-circle', command: () => window.location.href = "/feature2" }
            ]
        },
        { label: 'Registrarse', icon: 'pi pi-info', command: () => window.location.href = "/signup" },
        { label: 'Iniciar Sesión', icon: 'pi pi-envelope', command: () => window.location.href = "/contact" }
    ];

    const end = <button className="p-button p-component p-button-rounded p-button-secondary">
        <i className="pi pi-user"></i>
    </button>;

    return (
        <Menubar model={items} end={end} />
    );
};

export default Navbar;
