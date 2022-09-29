import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const title = {
    title: 'Sample Form React',
    subtitle: 'Let me "know" you 😉'
}

root.render(
    <React.StrictMode>
        <App
            title={title}
        />
    </React.StrictMode>
);