import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
const UserRegistrationModal = ({ show, onClose }) => {
  const initialValues = {
    username: '',
    nombre: '',
    apellido: '',
    rol: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Campo requerido'),
    nombre: Yup.string().required('Campo requerido'),
    apellido: Yup.string().required('Campo requerido'),
    rol: Yup.string().required('Campo requerido'),
    password: Yup.string()
      .required('Campo requerido')
      .min(8, 'Mínimo 8 caracteres')
      .max(16, 'Máximo 16 caracteres'),
    confirmPassword: Yup.string()
      .required('Campo requerido')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  });

  const handleSubmit = (values) => {
    // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones
    console.log('Valores enviados:', values);
    onClose();
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
          <h2 className="text-2xl font-bold mx-auto">Registro de Usuario</h2>
          <button onClick={onClose} className="text-gray-700 text-2xl hover:text-gray-900">
            &times;
          </button>
        </div>

        <div className="modal-content py-4 text-left px-6">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                  Username
                </label>
                <Field type="text" name="username" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="username" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
                  Nombre
                </label>
                <Field type="text" name="nombre" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="nombre" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">
                  Apellido
                </label>
                <Field type="text" name="apellido" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="apellido" component="div" className="text-red-500" />
              </div>

              <div className="mb-4">
                <label htmlFor="rol" className="block text-gray-700 font-bold mb-2">
                  Rol
                </label>
                <Field as="select" name="rol" className="border rounded w-full py-2 px-3">
                  <option value="">Seleccione un rol</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                </Field>
                <ErrorMessage name="rol" component="div" className="text-red-500" />
              </div>

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
              <div className="mb-4"></div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right"
                >
                  Registrarse
                </button>
              </div>
              
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationModal;



