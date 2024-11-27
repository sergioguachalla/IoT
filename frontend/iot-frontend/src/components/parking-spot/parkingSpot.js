import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tooltip } from "primereact/tooltip";

const ParkingSpot = () => {
   const userInformation = JSON.parse(localStorage.getItem("info"));
   const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
   const [info, setInfo] = useState(null);
   const [location, setLocation] = useState(null);

   const [cars, setCars] = useState([]);
   const [selectedCar, setSelectedCar] = useState(null);
   const [endTime, setEndTime] = useState(null);
   const [formData, setFormData] = useState({
      user_id: info ? info.id : null,
      location: "",
      car_id: 0,
      longitude: location ? location.longitude : "",
      latitude: location ? location.latitude : "",
      location: "",
      end_time: null
   });

   const getLocation = async () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocation({ latitude, longitude });
                  console.log("Latitude is :", latitude);
                  console.log("Longitude is :", longitude);
              }
          );
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  };
  const getCars = async () => {
   try {
      const response = await axios.get(`http://localhost:8000/users/${userInformation.id}/cars`);
      console.log(response);
      const cars2 = response.data.map((car) => {
         return {
            label: `${car.car_brand} ${car.car_plate} `,
            value: car.id
         };
      });
      setCars({ data: cars2 });
   }
   catch (error) {
      console.error(error);
   }
};

  const fetchLocation = async () => {
   var url = ""
   if (location) {
      url = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${GEO_API_KEY}`;
   }
   
   try {
     const response = await axios.get(url);
     if (response.data.results && response.data.results.length > 0) {
      console.log(response.data.results[0].formatted);
      setFormData({
         ...formData,
         location: response.data.results[0].formatted,
         longitude: location.longitude+"",
         latitude: location.latitude+"",
         user_id: userInformation.id,
         car_id: selectedCar
      })}
   }
   catch (error) {
      console.error(error);
   }
 };

   //TODO: add modal for alert
   const handleRegister = () => {
      if (!formData.location) {
         alert("Debes obtener la ubicación antes de registrar.");
         return;
      }
      console.log(formData);
      const response = axios.post(`http://localhost:8000/users/parking_record`, formData);
      console.log(response);

};
      
   useEffect(() => {
      setInfo(JSON.parse(localStorage.getItem("info")));
      getCars();
      getLocation();

   }, []);
   

   return (
       <div>
         <Navbar></Navbar>
           <h1>Agregar un registro de estacionamiento</h1>
           <p> Aquí podrás agregar un registro de estacionamiento</p>
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Formulario de Registro</h2>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="car" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Seleccionar Carro</label>
                <Dropdown
                    id="car"
                    value={selectedCar}
                    options={cars.data}
                    onChange={(e) => setSelectedCar(e.value)}
                    placeholder="Selecciona un carro"
                    style={{ width: '100%' }}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    label="Obtener Ubicación"
                    icon="pi pi-map-marker"
                    onClick={fetchLocation}
                    style={{ backgroundColor: '#17a2b8', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px' }}
                />
                <Button
                    label="Registrar"
                    icon="pi pi-check"
                    onClick={handleRegister}
                    
                    tooltip="Debes darle click a 'Obtener Ubicación' antes de registrar."
                    style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px' }}
                />
            </div>
        </div>
    
       </div>
   );
};

export default ParkingSpot;