// src/components/navbar/Navbar.js
import React, { useEffect, useState } from "react";
import { Menubar } from "primereact/menubar";
import "./Navbar.css";

const Navbar = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem("info");
    setInfo(info ? JSON.parse(info) : null);
  }, []);

  const item = info
    ? { label: info.username, action: () => (window.location.href = "/profile") }
    : { label: "Iniciar Sesión", command: () => (window.location.href = "/login") };

  const items = [
    { label: "Inicio", icon: "pi pi-home", command: () => (window.location.href = "/home") },
    {
      label: "Registros",
      icon: "pi pi-star",
      items: [
        { label: "Mis registros", icon: "pi pi-info", command: () => (window.location.href = "/my-records") },
        { label: "Parqueo", icon: "pi pi-info-circle", command: () => (window.location.href = "/parking-spot") },
      ],
    },
    { label: "Registrarse", icon: "pi pi-info", command: () => (window.location.href = "/signup") },
    {
      label: item.label,
      icon: "pi pi-user",
      command: () => {
        if (info) {
          window.location.href = "/profile";
        } else {
          window.location.href = "/login";
        }
      },
    },
  ];

  const end = (
    <button className="custom-button">
      <i className="pi pi-user"></i>
    </button>
  );

  return (
    <div className="navbar-container">
      <Menubar model={items} end={end} />
    </div>
  );
};

export default Navbar;
