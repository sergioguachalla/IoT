import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import "./userRecords.css";

const UserRecords = () => {
   const [records, setRecords] = useState([]);
   const [info, setInfo] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const infoObject = JSON.parse(localStorage.getItem('info'));
      if (infoObject) {
         setInfo(infoObject);
         setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/users/${infoObject.id}/records`)
               .then(response => {
                  setRecords(response.data);
                  setLoading(false);
               });
         }, 300);
      } else {
         console.warn("No info found in localStorage.");
         setLoading(false); 
      }
   }, []);

   const itemTemplate = (record) => (
      <div className="record-card">
         <h3>{`Ubicación: ${record.location}`}</h3>
         <p><b>ID Usuario:</b> {record.user_id}</p>
         <p><b>Fecha de creación:</b> {new Date(record.created_at).toLocaleString()}</p>
         <a 
            href={record.video_url} 
            target="_blank" 
            rel="noopener noreferrer"
         >
            <Button label="Ver Video" className="p-button-rounded p-button-success" />
         </a>
      </div>
   );

   return (
      <div>
         <Navbar />
         <div className="user-records-container">
            <h1>Mis Registros</h1>
            {loading ? (
               <div className="skeleton-container">
                  <Skeleton height="2rem" />
                  <Skeleton width="100%" height="150px" style={{ borderRadius: "10px" }} />
               </div>
            ) : records.length === 0 ? (
               <h2>No hay registros</h2>
            ) : (
               <div className="dataview-demo">
                  <h2>Mis registros</h2>
                  <p>En esta página podrás ver tus registros.</p>
                  <DataView
                     value={records}
                     layout="list" 
                     itemTemplate={itemTemplate}
                     paginator 
                     rows={3} 
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default UserRecords;
