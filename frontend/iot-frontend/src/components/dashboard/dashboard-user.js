import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import axios from "axios";

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para obtener la información del usuario
    const fetchUserInfo = () => {
        const info = JSON.parse(localStorage.getItem("info"));
        setUserInfo(info);
        return info;
    };

    // Función para obtener los datos del gráfico desde la API
    const fetchChartData = async (userId) => {
        setLoading(true); // Mostrar indicador de carga mientras se actualizan los datos
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/${userId}/records`
            );
            const records = response.data;

            // Procesar los datos para el gráfico
            const frequencyByDate = records.reduce((acc, record) => {
                const date = new Date(record.created_at).toLocaleDateString(); // Convertir a formato de fecha legible
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

            setChartData(data);
        } catch (error) {
            console.error("Error al obtener los datos del gráfico:", error);
        } finally {
            setLoading(false); // Ocultar indicador de carga después de actualizar los datos
        }
    };

    useEffect(() => {
        const userInfo = fetchUserInfo();
        if (userInfo) {
            fetchChartData(userInfo.id);
        } else {
            setLoading(false);
        }
    }, []);

    const handleRefreshData = () => {
        if (userInfo) {
            fetchChartData(userInfo.id);
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Dashboard de control</h1>
            <p>Bienvenido{userInfo ? `, ${userInfo.name}` : ""} a tu panel de control.</p>

            <div style={{ margin: "20px auto", maxWidth: "600px" }}>
                <h3 style={{ textAlign: "center" }}>Gráfico de Frecuencia de Registros</h3>
                {loading ? (
                    <p>Cargando datos del gráfico...</p>
                ) : chartData ? (
                    <Chart type="bar" data={chartData} />
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
        </div>
    );
};

export default Dashboard;
