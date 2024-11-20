import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { UserProvider } from './Components/API/UserContext';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
        <UserProvider>
            <App />
        </UserProvider>
);


