import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importing global styles
import App from './App'; // Importing the main App component

// React 18 update with createRoot
import { createRoot } from 'react-dom/client';

// Selecting the root element from the HTML
const container = document.getElementById('root');
const root = createRoot(container);

// Rendering the App component inside the root element
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

