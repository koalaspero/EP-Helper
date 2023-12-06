import React, { useState } from 'react';

const ObservationsComponent = () => {
  const [observation, setObservation] = useState('');
  const [observationsList, setObservationsList] = useState([]);

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

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 mt-4">
      <div className="pb-2 border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-semibold">Observations</h2>
      </div>
      <div className="flex items-center justify-center h-40 border-dashed border-[#e0e0e0] my-4">
        <div className="cursor-pointer group">
          <div className="text-[3rem] text-gray-400 group-hover:text-gray-600 transition duration-300">
            +
          </div>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full p-2 border border-[#e0e0e0] rounded-md resize-none"
          placeholder="Write your observation (max 500 characters)"
          value={observation}
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleAddObservation}
        >
          Add Observation
        </button>
      </div>
      <div className="mt-4">
        <ul>
          {observationsList.map((obs, index) => (
            <li key={index} className="mb-2">
              {obs}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ObservationsComponent;
