import React, { useEffect } from 'react';
import { useState } from 'react';
const ViewResults = ({ show, onClose,row_selected }) => {
  const [row,setRow]= useState()
  const [message, setMessage] = useState("");
  useEffect(() => {
    //transform row_selected.observación a string con viñeta de cada elemento
    if(row_selected){
      let observation = ''
      for (let i = 0; i < row_selected.observation.length; i++) {
        observation += '•'+ row_selected.observation[i] + '\n'
      }
      setMessage(observation)
    }
    setRow(row_selected)
  },[row_selected]);
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white w-full md:max-w-3xl mx-auto rounded-lg shadow-lg z-50 overflow-y-auto">
        <div className="modal-header flex justify-between items-center p-2">
          <h2 className="text-2xl font-bold mx-auto">Ver Diagnostico</h2>
          <button onClick={onClose} className="text-gray-700 text-2xl hover:text-gray-900">
            &times;
          </button>
        </div>
        <div className="modal-content px-auto">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col space-y-4 mx-auto py-4"> {/* Añadido espacio vertical py-4 */}
              <div className="py-2">
                <div className="flex items-center pb-2">
                  <label className="text-sm font-semibold px-1">Usuario:</label> {/* Añadido espacio horizontal px-1 */}
                  <input
                    value={row && row.doctor}
                    className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Jane Doe"
                    aria-label="Nombre completo"
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="flex items-center pb-2">
                  <label className="text-sm font-semibold px-1">Fecha:</label> {/* Añadido espacio horizontal px-1 */}
                  <input
                    value={row && row.fecha}
                    className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Jane Doe"
                    aria-label="Nombre completo"
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="flex items-center  pb-2">
                  <label className="text-sm font-semibold px-1">Probabilidad:</label> {/* Añadido espacio horizontal px-1 */}
                  <input
                    value={row && row.probability}
                    className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Jane Doe"
                    aria-label="Nombre completo"
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="flex items-center  pb-2">
                  <label className="text-sm font-semibold px-1">Ruta de archivo:</label> {/* Añadido espacio horizontal px-1 */}
                  <input
                    value={row && row.source_file}
                    className="appearance-none bg-transparent border-b border-teal-500 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Jane Doe"
                    aria-label="Nombre completo"
                  />
                </div>
              </div>
              <div className="py-2">
                <div className="flex items-center pb-4">
                  <label className="text-sm font-semibold px-1">Parkinson:</label> {/* Añadido espacio horizontal px-1 */}
                  <input
                    type="checkbox"
                    checked={row && row.hasParkinson}
                    readOnly
                    className="ml-1 form-checkbox h-5 w-5 text-blue-600 border-b border-teal-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 mx-auto items-center content-center w-1/2 pb-2">
                <label className="text-xl font-bold mx-auto content-center">Observación:</label>
                <textarea
                    type="text"
                    readOnly
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 h-full align-top"
                    value={message}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewResults; // Place the export at the top level