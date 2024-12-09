import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import axios from "axios";
import { Knob } from 'primereact/knob';
import CountCard from "./countCard";
const Dashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [chartOptions, setChartOptions] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataDashboard, setDataDashboard] = useState([]);
    const [socket, setSocket] = useState(null);
    const [usersCount, setUsersCount] = useState(0);
    const [recordsCount, setRecordsCount] = useState(0);

    useEffect(() => {
        const userInfo = fetchUserInfo();
        if (userInfo) {
            fetchChartData(userInfo.id);
        } else {
            setLoading(false);
        }
        const socketInstance = new WebSocket('ws://localhost:8000/ws');
        setSocket(socketInstance);
        socketInstance.onmessage = (e) => {
            const dataList = JSON.parse(e.data);

            setDataDashboard((prevData) => [...prevData, dataList]);
            setUsersCount(dataList.users_count);
            setRecordsCount(dataList.records_count);
        };
      
          // Cleanup on unmount
            return () => {
                socketInstance.close();
            };
          
    }, []);
    // Función para obtener la información del usuario
    const fetchUserInfo = () => {
        const info = JSON.parse(localStorage.getItem("info"));
        setUserInfo(info);
        return info;
    };

    // Función para obtener los datos del gráfico desde la API
    const fetchChartData = async (userId, isInitialLoad = false) => {
        if (isInitialLoad) setLoadingInitial(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/${userId}/records`
            );
            const records = response.data;

            // Procesar los datos para el gráfico
            const frequencyByDate = records.reduce((acc, record) => {
                const date = new Date(record.created_at).toLocaleDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            // Crear datos para el gráfico
            const labels = Object.keys(frequencyByDate);
            const values = Object.values(frequencyByDate);

            const data = {
                labels,
                datasets: [
                    {
                        label: "Registros por Fecha",
                        data: values,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            };

            // Opciones para el gráfico: asegurar valores enteros en el eje Y
            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1, // Incremento de 1 para que solo muestre enteros
                            callback: (value) => Number.isInteger(value) ? value : null, // Mostrar solo números enteros
                        },
                    },
                },
            };

            setChartData(data);
            setChartOptions(options);
        } catch (error) {
            console.error("Error al obtener los datos del gráfico:", error);
        } finally {
            if (isInitialLoad) setLoadingInitial(false);
        }
    };

    useEffect(() => {
        const userInfo = fetchUserInfo();
        if (userInfo) {
            fetchChartData(userInfo.id, true);

            // Establecer un intervalo para actualizar los datos cada 5 segundos
            const intervalId = setInterval(() => {
                fetchChartData(userInfo.id, false);
            }, 10000);

            return () => clearInterval(intervalId);
        } else {
            setLoadingInitial(false);
        }
    }, []);




    const handleRefreshData = () => {
        if (userInfo) {
            fetchChartData(userInfo.id, false);
        }
    };
    return (
        <div>
            <Navbar />
            <h1>Dashboard de control</h1>
            <p>Bienvenido{userInfo ? `, ${userInfo.name}` : ""} a tu panel de control.</p>

            <div style={{ margin: "20px auto", maxWidth: "600px" }}>
                <h3 style={{ textAlign: "center" }}>Gráfico de Frecuencia de Registros</h3>
                {loadingInitial ? (
                    <p>Cargando datos del gráfico...</p>
                ) : chartData ? (
                    <Chart type="bar" data={chartData} options={chartOptions}/>
                ) : (
                    <p>No hay datos disponibles para el gráfico.</p>
                )}
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button
                    label="Actualizar Datos"
                    icon="pi pi-refresh"
                    onClick={handleRefreshData}
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                    }}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", margin: "20px auto" }}>

                <div style={{ textAlign: "center", flex: 1 }}>
                    <h3 style={{ marginBottom: "10px", color: "#333" }}>Número de Usuarios</h3>
                    <CountCard value={usersCount} maxValue={50} title="Usuarios Registrados" />
                </div>

                <div style={{ textAlign: "center", flex: 1 }}>
                    <h3 style={{ marginBottom: "10px", color: "#333" }}>Cantidad de Fotografías Tomadas</h3>
                    <CountCard value={recordsCount} maxValue={50} title="Fotografías Tomadas" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
