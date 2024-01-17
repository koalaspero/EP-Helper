import { useState } from 'react';
import { signupFields, passwords } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { apiBasUrl } from '../constants/formFields';
import { useNavigate } from "react-router-dom";
import { getRoleFromToken } from '../utilites/handleToken';
import { saveToken } from "../utilites/handleToken";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const fields=signupFields;
const passwordsFields= passwords;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');
passwordsFields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [passwordsState,setPasswordsState]=useState(fieldsState);
  const navigate = useNavigate();

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  const handlePasswordChange=(e)=>setPasswordsState({...passwordsState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    signupState['password'] = passwordsState['password']
    signupState['confirm-password'] = passwordsState['confirm-password']
    createAccount()
  }



  //handle Signup API Integration here
  const createAccount=async ()=>{
    if (signupState['password'] !== signupState['confirm-password']) {
      // Passwords don't match, show SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newUser = {
      "name": signupState['name'],
      "last_name": signupState['last-name'],
      "username": signupState['username'],
      "password": signupState['password'],
      "is_active": true,
      "role": 2,
    }

    try {
      const response = await fetch(apiBasUrl + 'auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
      });
      if (!response.ok) {
          throw new Error(response.statusText);
      }


      Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Cuenta creada con éxito',
      }).then(async () => {
        const responseData = await response.json();
        if (responseData.error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: responseData.error,
          });
          return;
        }
        else{
          saveToken(responseData.access_token);
          let rol = getRoleFromToken(responseData.access_token);
          // eslint-disable-next-line
          if (rol == 1) {
            navigate("/admin");
          }else{
            navigate("/home");
          }
        }
      });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error en el sistema',
    });
  }




  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="pl-20">
          {
                  fields.map(field=>
                          <Input
                              key={field.id}
                              handleChange={handleChange}
                              value={signupState[field.id]}
                              labelText={field.labelText}
                              labelFor={field.labelFor}
                              id={field.id}
                              name={field.name}
                              type={field.type}
                              isRequired={field.isRequired}
                              placeholder={field.placeholder}
                      />
                  
                  )
          }
          </div>
          <div className="pl-20">
            {
                    passwordsFields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handlePasswordChange}
                                value={passwordsState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
            }
          </div>
          
        </div>
        <div className='flex justify-center'>
          <FormAction handleSubmit={handleSubmit} text="Registro" />
        </div>
      </form>
    )
}