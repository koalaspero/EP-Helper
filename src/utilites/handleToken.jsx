// Function to extract the role from the token
import jwtDecode from 'jwt-decode';
import { json } from 'react-router-dom';
const getRoleFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    const rol = decodedToken.rol;
    return rol;
};

// Function to extract the username from the token
const getUsernameFromToken = (token) => {
    // Decode the token
    const decodedToken = jwtDecode(token);
    
    // Extract the username from the decoded token
    const username = decodedToken.username;
    
    return username;
}
// Save token in local storage
const saveToken = (token) => {
    localStorage.setItem('token', token);
};

// Delete token from local storage
const deleteToken = () => {
    localStorage.removeItem('token');
};
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};
const isAdmin = () => {
    const token = localStorage.getItem('token');
    if(token){
        const decodedToken = jwtDecode(token);
        return decodedToken.rol ==1;
    }
    return false;
}
const isDoctor=()=>{
    const token = localStorage.getItem('token');
    if(token){
        const decodedToken = jwtDecode(token);
        return decodedToken.rol ==2;
    }
    return false;
}

export {getRoleFromToken, getUsernameFromToken, saveToken, deleteToken,isAuthenticated, isAdmin,isDoctor};