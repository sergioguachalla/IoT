import React, { useEffect, useState } from "react";
import axios from "axios";

const ParkingSpot = () => {
   const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;
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

  const fetchLocation = async () => {
   const url = `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${GEO_API_KEY}`;

   try {
     const response = await axios.get(url);
     if (response.data.results && response.data.results.length > 0) {
      console.log(response.data.results[0].formatted);
           } else {
       setError("No location data found.");
     }
   } catch (err) {
     setError("Failed to fetch location data.");
   }
 };

   useEffect(() => {
      getLocation();
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
                   <button onClick={fetchLocation}>Get Location</button>
               </div>
           )}
       </div>
   );
};

export default ParkingSpot;