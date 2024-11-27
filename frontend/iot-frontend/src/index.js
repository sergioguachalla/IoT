import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./components/login-form/LoginForm";
import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import UserRecords from './components/user-records/userRecords';
import ParkingSpot from './components/parking-spot/parkingSpot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/my-records" element={<UserRecords />} />
                <Route path="/parking-spot" element={<ParkingSpot />} />
            </Routes>
        </Router>
    </PrimeReactProvider>
);

reportWebVitals();
