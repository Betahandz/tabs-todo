import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// painting
import './index.css';
// createing root of the project
const root = ReactDOM.createRoot(document.querySelector("#root"));

// root rendering
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)