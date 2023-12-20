import React, { useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'; // Import the icons
import { apiBasUrl } from '../../constants/formFields';
import {getIdFromToken} from '../../utilites/handleToken'
import Swal from 'sweetalert2';

const ObservationsComponent = (props) => {
  const { result, csvBlob } = props; // Added csvBlob prop
  const [observation, setObservation] = useState('');
  const [observationsList, setObservationsList] = useState([]);
  const [selectedObservation, setSelectedObservation] = useState(null);
  const [isObservationsCollapsed, setIsObservationsCollapsed] = useState(false);

  const handleChange = (e) => {
    // Limit the input to 500 characters
    if (e.target.value.length <= 500) {
      setObservation(e.target.value);
    }
  };

  const handleAddObservation = () => {
    // Add the observation to the list
    if (observation.trim() !== '') {
      setObservationsList([...observationsList, observation]);
      setObservation('');
    }
  };


  const handleToggleObservations = () => {
    setIsObservationsCollapsed(!isObservationsCollapsed);
  };

  const postObservations = async (obsData) => {
    try {
      const response = await fetch(apiBasUrl +'meds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obsData),
      });
  
      if (!response.ok) {
        // Handle the error here
        console.error('Error:', response.status, response.statusText);
        return;
      }
  
      const res = await response.json();
      console.log('Result:', res);

      // Handle the successful response here
    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error here
    }
  }

  const postResult = async (resultData) => {
    try {
      const response = await fetch(apiBasUrl +'results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });
  
      if (!response.ok) {
        // Handle the error here
        console.error('Error:', response.status, response.statusText);
        return;
      }
  
      const result = await response.json();
      console.log('Result:', result);

      if(observationsList.length > 0){
        for (let i = 0; i < observationsList.length; i++) {

          let obsData = {
            observationText: observationsList[i],
            result: String(result['id'])
          }

          await postObservations(obsData)

        }
      }
      // Show the success alert
      await Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Resultados y observaciones registradas',
      });

      // Reload the page
      window.location.reload();

    } catch (error) {
      console.error('Error:', error.message);
      // Handle the error here
    }
  };

  let formattedObservations = ""

  const saveResultsToFile = async () => {
    // Format the results and observations
    if(observationsList.length > 1){
      formattedObservations = observationsList
      .map((obs) => {
        // Add a newline every 50 characters and a blank line before each observation
        const lines = [];
        const words = obs.split(' ');
        let currentLine = '';
        for (const word of words) {
          if (currentLine.length + word.length + 1 <= 50) {
            // Add word to the current line
            currentLine += (currentLine.length > 0 ? ' ' : '') + word;
          } else {
            // Start a new line
            lines.push(currentLine);
            currentLine = word;
          }
        }
        lines.push(currentLine);
        return lines.join('\n') + '\n\n';
      })
      .join('');
    }else{
      formattedObservations = observationsList[0]
    }
    
  
    const formattedResults = `Resultados:\n${result}\n\nObservaciones:\n${formattedObservations}`;
  
    // Read the binary content of the Blob
    const reader = new FileReader();
    reader.onloadend = async () => {
      // Now 'reader.result' contains the binary content of the file
      const binaryContent = new Uint8Array(reader.result);

      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-D

      const doctorId = getIdFromToken()

      const resultData = {
        fecha: formattedDate, // Replace with the actual date
        hasParkinson: true, // Replace with the actual value
        resultext: formattedResults, // Replace with the actual text
        source_file: binaryContent, // Replace with the actual result
        probability: 0.85, // Replace with the actual probability
        doctor: doctorId // Replace with the actual doctor's name
      };   
      
      await postResult(resultData)     
    };
  
    // Read the Blob as an ArrayBuffer
    reader.readAsArrayBuffer(csvBlob);

    // Create a download link and trigger the download
    // const downloadLink = document.createElement('a');
    // downloadLink.href = URL.createObjectURL(blob);
    // downloadLink.download = 'results_and_observations.txt';
    // downloadLink.click();
  };
  

  return (
    <div className="bg-white shadow rounded-lg w-full pt-3 pb-5 mt-4">
      <div className="pb-2 border-b border-[#e0e0e0]">
        <div className="flex items-center justify-between">
          <h2 className="text-black text-[17px] font-semibold">Observaciones</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
            onClick={handleToggleObservations}
          >
            {isObservationsCollapsed ? <FaCaretDown /> : <FaCaretUp />}
            <span className="ml-2">{isObservationsCollapsed ? 'Expandir' : 'Retraer'}</span>
          </button>
        </div>
      </div>
      {!isObservationsCollapsed && (
        <>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-[#e0e0e0] rounded-md resize-none"
              placeholder="Escribe una observación (500 caracteres máximo)"
              value={observation}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
              onClick={handleAddObservation}
            >
              <div className='text-sky-950'>
                Agregar Observación
              </div>
            </button>
          </div>
          <div className="mt-4">
            <label className="text-gray-600">Seleccionar observación:</label>
            <select
              className="block w-full p-2 border border-[#e0e0e0] rounded-md mt-2" // Adjust the width as needed
              onChange={(e) => setSelectedObservation(parseInt(e.target.value, 10))}
              value={selectedObservation !== null ? selectedObservation : ''}
            >
              <option value="" disabled>
                Seleccionar observación
              </option>
              {observationsList.map((obs, index) => (
                <option key={index} value={index}>
                  {obs}
                </option>
              ))}
            </select>
          </div>
          {selectedObservation !== null && (
            <div className="mt-4">
              <h3 className="text-gray-600 mb-2">Observación seleccionada:</h3>
              <div className="border p-2 border-[#e0e0e0] rounded-md">
                {observationsList[selectedObservation]}
              </div>
            </div>
          )}
        </>
      )}
      <div className="mt-4 flex justify-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
          onClick={saveResultsToFile}
        >
          <div className='text-sky-950'>
            Registrar resultados
          </div>
        </button>
      </div>
    </div>
  );
};

export default ObservationsComponent;







