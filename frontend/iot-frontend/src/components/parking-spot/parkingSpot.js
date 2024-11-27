import React, { useEffect, useState } from "react";
import axios from "axios";

const ParkingSpot = () => {
   const [info, setInfo] = useState(null);
   const [location, setLocation] = useState(null);
   const [error, setError] = useState(null);
   const getLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocation({ latitude, longitude });
                  console.log("Latitude is :", latitude);
                  console.log("Longitude is :", longitude);
              },
              (error) => {
                  setError(error.message);
              }
          );
      } else {
          setError("Geolocation is not supported by this browser.");
      }
  };
   useEffect(() => {
      setInfo(JSON.parse(localStorage.getItem("info")));
   }, []);
   

   return (
       <div>
           <h1>Estacionamiento</h1>
           {info && (
               <div>
                   <h3>{`Bienvenido, ${info.name} ${info.lastname}`}</h3>
                   <p>{`Tu ID es: ${info.id}`}</p>
                   <p>{`Tu email es: ${info.email}`}</p>
                   <p>{`Tu ubicación es: ${location ? `Latitud: ${location.latitude}, Longitud: ${location.longitude}` : "Cargando ubicación..."}`}</p>
                   {error && <p>{error}</p>}
                   <button onClick={getLocation}>Get Location</button>
               </div>
           )}
       </div>
   );
};

export default ParkingSpot;