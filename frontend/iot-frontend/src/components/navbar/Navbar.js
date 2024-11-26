import React from 'react';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => window.location.href = "/" },
        { label: 'Features', icon: 'pi pi-star',
            items: [
                { label: 'Feature 1', icon: 'pi pi-info', command: () => window.location.href = "/feature1" },
                { label: 'Feature 2', icon: 'pi pi-info-circle', command: () => window.location.href = "/feature2" }
            ]
        },
        { label: 'About', icon: 'pi pi-info', command: () => window.location.href = "/about" },
        { label: 'Contact', icon: 'pi pi-envelope', command: () => window.location.href = "/contact" }
    ];

    const end = <button className="p-button p-component p-button-rounded p-button-secondary">
        <i className="pi pi-user"></i>
    </button>;

    return (
        <Menubar model={items} end={end} />
    );
};

export default Navbar;
