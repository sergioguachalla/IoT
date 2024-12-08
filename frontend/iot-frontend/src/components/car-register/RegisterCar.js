import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import "./RegisterCar.css";

const RegisterCar = () => {
  const [formData, setFormData] = useState({
    car_brand: "",
    car_plate: "",
    car_color: "",
    car_model: "",
    car_year: "",
  });

  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const info = JSON.parse(localStorage.getItem("info"));
      if (!info) {
        toast.current.show({ severity: "warn", summary: "Usuario no autenticado", detail: "Inicia sesión para continuar" });
        setLoading(false);
        return;
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/car`, {
        user_id: info.id,
        ...formData,
      });

      if (response.status === 200) {
        toast.current.show({ severity: "success", summary: "Registro exitoso", detail: "Automóvil registrado correctamente" });
        setFormData({
          car_brand: "",
          car_plate: "",
          car_color: "",
          car_model: "",
          car_year: "",
        });
      } else {
        toast.current.show({ severity: "error", summary: "Error", detail: "No se pudo registrar el automóvil" });
      }
    } catch (error) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Error en la conexión con el servidor" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Toast ref={toast} />
      <div className="register-car-container">
        <h1>Registrar Automóvil</h1>
        <form className="register-car-form" onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="car_brand">Marca</label>
            <InputText id="car_brand" name="car_brand" value={formData.car_brand} onChange={handleChange} required placeholder="Ejemplo: Toyota" />
          </div>
          <div className="p-field">
            <label htmlFor="car_plate">Matrícula</label>
            <InputText id="car_plate" name="car_plate" value={formData.car_plate} onChange={handleChange} required placeholder="Ejemplo: ABC-1234" />
          </div>
          <div className="p-field">
            <label htmlFor="car_color">Color</label>
            <InputText id="car_color" name="car_color" value={formData.car_color} onChange={handleChange} required placeholder="Ejemplo: Rojo" />
          </div>
          <div className="p-field">
            <label htmlFor="car_model">Modelo</label>
            <InputText id="car_model" name="car_model" value={formData.car_model} onChange={handleChange} required placeholder="Ejemplo: Corolla" />
          </div>
          <div className="p-field">
            <label htmlFor="car_year">Año</label>
            <InputText id="car_year" name="car_year" value={formData.car_year} onChange={handleChange} required placeholder="Ejemplo: 2021" type="number" />
          </div>
          <Button label="Registrar Automóvil" icon="pi pi-save" loading={loading} className="p-button-primary" />
        </form>
      </div>
    </div>
  );
};

export default RegisterCar;
