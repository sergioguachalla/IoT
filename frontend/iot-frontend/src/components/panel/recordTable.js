import React, { useEffect, useState } from 'react';
import Navbar from "../navbar/Navbar";
import axios from 'axios';
import './RecordTable.css'; // Archivo CSS externo para estilos

const RecordTable = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const infoObject = JSON.parse(localStorage.getItem('info'));
        if (infoObject) {
            setUserId(infoObject.id);
            setTimeout(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/users/${infoObject.id}/records`)
                    .then((response) => {
                        setRecords(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error('Error al obtener los registros:', error);
                        setLoading(false);
                    });
            }, 300);
        } else {
            console.warn("No se encontró información del usuario en localStorage.");
            setLoading(false);
        }
    }, []);

    const getRowColor = (sensorStatus) => {
        return sensorStatus === 0 ? '#d4edda' : '#f8d7da'; // Verdes y rojos suaves
    };

    const getSensorMessage = (sensorStatus) => {
        return sensorStatus === 0 ? 'Sin movimiento' : 'Movimiento detectado';
    };

    if (loading) {
        return <div className="loading">Cargando registros...</div>;
    }

    return (
        <div className="record-table-container">
            <Navbar />
            <h2 className="table-title">Registros del Usuario</h2>
            <div className="table-wrapper">
                <table className="record-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Ubicación</th>
                            <th>Video</th>
                            <th>Estado del Sensor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id} style={{ backgroundColor: getRowColor(record.sensor_aprox) }}>
                                <td>{record.id}</td>
                                <td>{new Date(record.created_at).toLocaleString()}</td>
                                <td>{record.location}</td>
                                <td><a href={record.video_url} target="_blank" rel="noopener noreferrer">Ver Video</a></td>
                                <td>{getSensorMessage(record.sensor_aprox)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecordTable;
