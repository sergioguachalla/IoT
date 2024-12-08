// src/components/home/Home.js
import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [theme, setTheme] = useState("morning");

  // Cambia el tema basado en la hora
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTheme("morning"); // Mañana
    else if (hour >= 12 && hour < 18) setTheme("afternoon"); // Tarde
    else setTheme("night"); // Noche
  }, []);

  // Configuración del carrusel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={`home-container ${theme}`}>
      <Navbar />
      <header className="home-header">
        <h1>Bienvenido a CarMonitor</h1>
        <p>Monitorea tu auto mientras lo estacionas, recibe alertas en tiempo real.</p>
      </header>
      <section className="carousel-section">
        <Slider {...carouselSettings}>
          <div>
            <img src="/home1.jpg" alt="Monitoreo" className="carousel-image" />
          </div>
          <div>
            <img src="/home3.jpg" alt="Control Total" className="carousel-image" />
          </div>
        </Slider>
      </section>
      <section className="cards-section">
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h2>Monitoreo en Tiempo Real</h2>
            </div>
            <div className="card-back">
              <p>
                Con nuestra tecnología, recibirás alertas si hay actividad sospechosa cerca de tu vehículo.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h2>Notificaciones Instantáneas</h2>
            </div>
            <div className="card-back">
              <p>
                Recibe notificaciones directamente en tu móvil para estar siempre informado.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div className="card-front">
              <h2>Control Total</h2>
            </div>
            <div className="card-back">
              <p>
                Accede a un historial completo de eventos y asegúrate de que tu auto está seguro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
