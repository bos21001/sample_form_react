import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const title = {
    title: 'Sample Form React',
    subtitle: 'Let me "know" you 😉'
}

root.render(
    <Router>
        <App
            title={title}
        />
    </Router>
);