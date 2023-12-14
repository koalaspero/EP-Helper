import React from 'react';
import { useNavigate } from 'react-router-dom';

// UserGuard component
const UserGuard = ({ children, DefaultRoute }) => {
  const isUser = true;/* Lógica para verificar si el usuario es un usuario normal */;
  const navigate = useNavigate();

  if (!isUser) {
    // Si el usuario no es un usuario normal, redirige a la página de inicio de sesión
    navigate('/');
    return DefaultRoute; // Renderiza la página predeterminada
  }

  return <>{children}</>; // Renderiza las rutas protegidas si el usuario es un usuario normal
};

// AdminGuard component
const AdminGuard = ({ children, DefaultRoute }) => {
  const isAdmin = true;/* Lógica para verificar si el usuario es un administrador */;
  const navigate = useNavigate();

  if (!isAdmin) {
    // Si el usuario no es un administrador, redirige a la página de inicio de sesión
    navigate('/');
    return DefaultRoute; // Renderiza la página predeterminada
  }

  return <>{children}</>; // Renderiza las rutas protegidas si el usuario es un administrador
};

export { UserGuard, AdminGuard };