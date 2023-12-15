import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import AdminPrincipalPage from "./pages/AdminPrincipal";
import UsuariosAdmin from "./pages/UsuariosAdmin";
import { isDoctor, isAdmin } from './utilites/handleToken';
import { useEffect, useState } from 'react';
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [doctor, setDoctor] = useState(isDoctor());
  const [admin, setAdmin] = useState(isAdmin());
  const location = useLocation();
  useEffect(() => {
    // Verificar los roles de doctor y administrador cada vez que cambia la ruta
    setDoctor(isDoctor());
    setAdmin(isAdmin());
  }, [location.pathname]);

  
  return (
    <div className="h-full h-screen flex justify-center bg-fondo">
      <div className="max-w-full w-full space-y-8">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={doctor ? <HomePage /> : <LoginPage />} />
          <Route
            path="/admin"
            element={admin ? <AdminPrincipalPage /> : <LoginPage />}
          />
          <Route
            path="/usuarios"
            element={admin ? <UsuariosAdmin /> : <LoginPage />}
          />
          <Route
            path="/diagnosis"
            element={admin ? <UsuariosAdmin /> : <LoginPage />}
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
