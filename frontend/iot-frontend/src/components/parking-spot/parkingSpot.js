import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./parkingSpot.css";

const ParkingSpot = () => {
  const userInformation = JSON.parse(localStorage.getItem("info"));
  const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
  const [location, setLocation] = useState(null);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(1);
  const [formData, setFormData] = useState({
    user_id: userInformation?.id || null,
    location: "",
    car_id: 0,
    longitude: "",
    latitude: "",
    end_time: null,
  });

  // Obtener ubicación actual del usuario
  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          alert("No se pudo acceder a la ubicación.");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  // Obtener autos del usuario
  const getCars = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userInformation.id}/cars`);
      const carOptions = response.data.map((car) => ({
        label: `${car.car_brand} ${car.car_plate}`,
        value: car.id,
      }));
      setCars(carOptions);
    } catch (error) {
      console.error("Error al obtener los autos:", error);
    }
  };

  // Obtener dirección basada en la ubicación actual
  const fetchLocation = async () => {
    if (!location) {
      alert("Debes permitir el acceso a tu ubicación.");
      return;
    }
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${GEO_API_KEY}`;
    try {
      const response = await axios.get(url);
      if (response.data.results && response.data.results.length > 0) {
        const formattedLocation = response.data.results[0].formatted;
        setFormData({
          ...formData,
          location: formattedLocation,
          longitude: location.longitude.toString(),
          latitude: location.latitude.toString(),
          user_id: userInformation.id,
          car_id: selectedCar,
        });
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
    }
  };

  // Registrar estacionamiento
  const handleRegister = async () => {
    if (!formData.location) {
      alert("Debes obtener la ubicación antes de registrar.");
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/parking_record`, formData);
      if (response.status === 200) {
        alert("Estacionamiento registrado exitosamente.");
        setFormData({
          ...formData,
          location: "",
          longitude: "",
          latitude: "",
          car_id: 0,
          end_time: null,
        });
        setSelectedCar(null);
      }
    } catch (error) {
      console.error("Error al registrar el estacionamiento:", error);
      alert("Hubo un error al registrar el estacionamiento.");
    }
  };

  useEffect(() => {
    getCars();
    getLocation();
  }, []);

  return (
   <div>
      <Navbar />
    <div className="parking-spot-container">
      
      <h1>Agregar un registro de estacionamiento</h1>
      <p>Aquí podrás agregar un registro de estacionamiento</p>
      <div className="form-container">
        <h2>Formulario de Registro</h2>
        <div>
          <label htmlFor="car">Seleccionar Carro</label>
          <Dropdown
            id="car"
            value={selectedCar}
            options={cars}
            onChange={(e) => {setSelectedCar(e.value)}}
            placeholder="Selecciona un carro"
          />
        </div>
        <div className="button-group">
          <Button
            label="Obtener Ubicación"
            icon="pi pi-map-marker"
            onClick={fetchLocation}
            tooltip="Obtén tu ubicación actual."
          />
          <Button
            label="Registrar"
            icon="pi pi-check"
            onClick={handleRegister}
            tooltip="Debes darle click a 'Obtener Ubicación' antes de registrar."
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ParkingSpot;
