import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import axios from "axios";
import { Knob } from "primereact/knob";
import CountCard from "./countCard";
import "./Dashboard.css";

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

        const socketInstance = new WebSocket("ws://localhost:8000/ws");
        setSocket(socketInstance);

        socketInstance.onmessage = (e) => {
            const dataList = JSON.parse(e.data);
            setDataDashboard((prevData) => [...prevData, dataList]);
            setUsersCount(dataList.users_count);
            setRecordsCount(dataList.records_count);
        };

        return () => {
            socketInstance.close();
        };
    }, []);

    const fetchUserInfo = () => {
        const info = JSON.parse(localStorage.getItem("info"));
        setUserInfo(info);
        return info;
    };

    const fetchChartData = async (userId, isInitialLoad = false) => {
        if (isInitialLoad) setLoadingInitial(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/users/${userId}/records`
            );
            const records = response.data;

            const frequencyByDate = records.reduce((acc, record) => {
                const date = new Date(record.created_at).toLocaleDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

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

            const options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1,
                            callback: (value) =>
                                Number.isInteger(value) ? value : null,
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

    const handleRefreshData = () => {
        if (userInfo) {
            fetchChartData(userInfo.id, false);
        }
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-header">
                <h1>Dashboard de Control</h1>
                <p>Bienvenido{userInfo ? `, ${userInfo.name}` : ""} a tu panel de control.</p>
            </div>

            <div className="chart-container">
                <h3>Gráfico de Frecuencia de Registros</h3>
                {loadingInitial ? (
                    <p>Cargando datos del gráfico...</p>
                ) : chartData ? (
                    <Chart type="bar" data={chartData} options={chartOptions} />
                ) : (
                    <p>No hay datos disponibles para el gráfico.</p>
                )}
            </div>

            <div className="refresh-button-container">
                <Button
                    label="Actualizar Datos"
                    icon="pi pi-refresh"
                    onClick={handleRefreshData}
                    className="refresh-button"
                />
            </div>

            <div className="statistics-container">
                <CountCard
                    value={usersCount}
                    maxValue={50}
                    title="Usuarios Registrados"
                />
                <CountCard
                    value={recordsCount}
                    maxValue={50}
                    title="Fotografías Tomadas"
                />
            </div>
        </div>
    );
};

export default Dashboard;
