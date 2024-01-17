/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import { useNavigate } from "react-router-dom";
import { apiBasUrl } from '../constants/formFields';
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { getRoleFromToken } from '../utilites/handleToken';
import { saveToken } from "../utilites/handleToken";
import Swal from 'sweetalert2';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const navigate = useNavigate();
    const [loginState,setLoginState]=useState(fieldsState);


    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async () => {
      try {
          const response = await fetch(apiBasUrl + 'token', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  username: loginState.username,
                  password: loginState.password,
              }),
          });
          if (!response.ok) {
              throw new Error(response.statusText);
          }

          Swal.fire({
              icon: 'success',
              title: 'Bienvenido',
              text: 'Iniciando sesión...',
          }).then(async () => {
            const responseData = await response.json();
            // Save the access token to the local storage
            saveToken(responseData.access_token);
            let rol = getRoleFromToken(responseData.access_token);
            // eslint-disable-next-line
            if (rol == 1) {
              navigate("/admin");
            }else{
              navigate("/home");
            }
          });
      } catch (error) {
        // eslint-disable-next-line
        if (error.message == "Unauthorized") {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Usuario o contraseña incorrectos',
          });
          console.error(error.message.status);
        }else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo salio mal',
          });
        }
      }
    };

    // Function to navigate to the Register Page
    const navigateToRegister = () => {
        navigate("signup"); 
    };

    return (
      <>
        <form
          className="flex flex-col items-center mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="-space-y-px w-full max-w-md">
            {fields.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={loginState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
          </div>
          <FormAction handleSubmit={handleSubmit} text="Inicia Sesión" />
          <FormExtra text="¿No tienes una cuenta?, registrate aquí" />
          <button
            type="button"
            className="group relative w-[10vw] rounded-[20px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 mt-10"
            onClick={() => navigateToRegister()}
          >
            <div class="text-center text-sky-950 ">Registrarse</div>
          </button>
        </form>
      </>
    );
      
}