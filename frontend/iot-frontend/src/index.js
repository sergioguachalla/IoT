import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./components/login-form/LoginForm";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    </PrimeReactProvider>
);

reportWebVitals();
