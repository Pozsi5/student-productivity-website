import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'react-oidc-context';
import { BrowserRouter } from 'react-router-dom';

const oidcConfig = {
    authority: "http://localhost:9080/realms/student-productivity-realm",
    // Keycloak kliens felület
    client_id: "frontend-client",
    // Bejelentkezés után ide irányítja a felhasználót
    redirect_uri: window.location.origin,

    //url "tisztító"
    onSigninCallback: () => {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
reportWebVitals();