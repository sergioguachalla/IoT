import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from "./components/login-form/LoginForm";
import Home from './components/home/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <PrimeReactProvider>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </Router>
    </PrimeReactProvider>
);

reportWebVitals();
