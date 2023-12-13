import React, { useState } from "react";
import UserRegistrationModal from "./UserRegistrationModal";
const AddUser = ({ data = [], fileName }) => {
  const [showModal, setShowModal] = useState(false);
   const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <button
        className="add-btn ml-auto"
        onClick={() => {
          handleShowModal();
        }}
      >
        Registrar Usuarios
      </button>
      <UserRegistrationModal show={showModal} onClose={handleCloseModal} />
    </>
  );
};

export default AddUser;