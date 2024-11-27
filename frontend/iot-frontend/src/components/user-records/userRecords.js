import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

const UserRecords = () => {

   const [records, setRecords] = useState([]);
   const [info, setInfo] = useState(null);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const infoObject = JSON.parse(localStorage.getItem('info'));
      if (infoObject) {
          setInfo(infoObject);
         setTimeout(() => {
            axios.get(`http://localhost:8000/users/${infoObject.id}/records`)
               .then(response => {
                  setRecords(response.data);
                  setLoading(false);
               })
               .catch(error => {
                  console.error("There was an error fetching the records!", error);
                  setLoading(false);
               });
         }, 300);
      } else {
          console.warn("No info found in localStorage.");
          setLoading(false); 
      }
  }, []);
   
   const itemTemplate = (record) => {
      return (
          <div className="p-card p-shadow-2 p-mb-3" style={{ padding: '2rem' }}>
              <h3>{`Location: ${record.location}`}</h3>
              <p><b>User ID:</b> {record.user_id}</p>
              <p><b>Created At:</b> {new Date(record.created_at).toLocaleString()}</p>
              <a 
                  href={record.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
              >
                  <Button label="Ver Video" className="p-button-rounded p-button-success" />
              </a>
          </div>
      );
   };

   return (
      <div>
         <Navbar></Navbar>
         <h1>Mis Registros</h1>
         {loading && (
            <div className="border-round border-1 surface-border p-4 surface-card">
            <div className="flex mb-3">
           <div>
               
               <Skeleton height=".5rem"></Skeleton>
           </div>
       </div>
         <Skeleton width="50%" height="150px" style={
            {borderRadius: '10px'}
         }></Skeleton>
            <div className="flex justify-content-between mt-3">
         <Skeleton width="50%" height="2rem"></Skeleton>
           
            </div>
         </div>
         )}

         {records.length == 0 ? (
            <h2>No hay registros</h2>
         ): (

            <div className="dataview-demo" style={{ padding: '2rem' }}>
            <h2>Mis registros</h2>
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
   );
};

export default UserRecords;