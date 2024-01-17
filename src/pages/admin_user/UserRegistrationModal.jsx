import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { apiBasUrl } from '../../constants/formFields';
const UserRegistrationModal = ({ show, onClose,row }) => {
  const [initialValues,setInitialValues]= useState({})
  const [validationSchema,setValidationSchema]= useState({})
  useEffect(() => {
    // eslint-disable-next-line
      if(row == null){
       setInitialValues({
        id:-1,
        username: '',
        name: '',
        last_name: '',
        rol: '',
        password: '',
        confirmPassword: '',
      })
      setValidationSchema(Yup.object().shape({
        username: Yup.string().required('Campo requerido'),
        name: Yup.string().required('Campo requerido'),
        last_name: Yup.string().required('Campo requerido'),
        rol: Yup.number().required('Campo requerido').oneOf([1, 2], 'Rol inválido'),
        password: Yup.string()
          .required('Campo requerido')
          .min(8, 'Mínimo 8 caracteres')
          .max(16, 'Máximo 16 caracteres'),
        confirmPassword: Yup.string()
          .required('Campo requerido')
          .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
      }));
    }else{
      setInitialValues({
        id:row.id,
        username:row.username,
        name: row.name,
        last_name: row.last_name,
        rol: row.role,
        password: '',
        confirmPassword: '',
      })
      setValidationSchema(Yup.object().shape({
        username: Yup.string().required('Campo requerido'),
        name: Yup.string().required('Campo requerido'),
        last_name: Yup.string().required('Campo requerido'),
        rol: Yup.string().required('Campo requerido'),
      }));
    }
  },[row]);
  const handleSubmit = async (values) => {
    // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones
    try{
      values.role = values.rol
      values.is_active= true;
      let method = row==null ? "POST" : "PUT";
      const response = await fetch(apiBasUrl + "users", {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
              throw new Error(response.status);
      }
      Swal.fire({
        title: 'Exito!',
        text: "Usuario registrado correctamente",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      Swal.fire({
        title: 'Exito!',
        text: "Usuario registrado correctamente",
        icon: 'success',
      }).then((result) => {
        onClose();
        window.location.reload();
      })
    }catch(error){
      console.log(error.message)
      console.log(error["error"])
      //how to get the code of the error

      if(error.message == 409){
        Swal.fire({
          title: 'Error!',
          text: "El usuario ya existe",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-full md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-header flex justify-between items-center p-2">
          <h2 className="text-2xl font-bold mx-auto">{row == null ? "Registro de Usuario" : "Editar Usuario"}</h2>
          <button onClick={onClose} className="text-gray-700 text-2xl hover:text-gray-900">
            &times;
          </button>
        </div>

        <div className="modal-content py-4 text-left px-6">
          <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                  Username
                </label>
                <Field type="text" name="username"  className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="username" component="div" className="text-red-500" ></ErrorMessage>
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                  Nombre
                </label>
                <Field type="text" name="name"  className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
                  Apellido
                </label>
                <Field type="text" name="last_name"  className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="last_name" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700 font-bold mb-2">
                  Rol
                </label>
                <Field as="select" name="rol" className="border rounded w-full py-2 px-3 bg-white text-black appearance-none">
                  <option value="">Seleccione un rol</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Doctor</option>
                </Field>
                <ErrorMessage name="rol" component="div" className="text-red-500" />
              </div>
              {
                row==null && (
                  <>
                    <div className="mb-4 relative">
                      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Contraseña
                      </label>
                      <div className="flex items-center">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          className="border rounded w-full py-2 px-3"
                        />
                        <div
                          className="absolute right-0 flex items-center pr-2 cursor-pointer"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                      </div>
                      <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>
                    <div className="mb-4 relative">
                      <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                        Confirmar Contraseña
                      </label>
                      <div className="flex items-center">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          className="border rounded w-full py-2 px-3"
                        />
                        <div
                          className="absolute right-0 flex items-center pr-2 cursor-pointer"
                          onClick={toggleShowPassword}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                      </div>
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                    </div>
              </>
                )
              }
              <div className="mb-4"></div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                >
                  {row == null ? "Registrar" : "Editar"}
                </button>
              </div>
              
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationModal; // Place the export at the top level



