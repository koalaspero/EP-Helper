import { deleteToken } from "../utilites/handleToken";
import { useNavigate } from "react-router-dom";

export default function Header({
  heading,
  isHome = false  // Optional parameter with a default value of false
}) {
  const navigate = useNavigate();

  // Function to handle logout (replace it with your actual logout logic)
  function handleLogout() {
    // Add your logout logic here
    console.log('Logout logic goes here');
    deleteToken();
    navigate('/');
  }
  return (
    <div className={`w-full bg-principal shadow ${isHome ? 'mb-10' : 'mb-5'}`}>
      {!isHome && (
        <div className="flex justify-between items-center text-center text-sky-950 text-2xl font-bold py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-20">
          <div className="mx-auto">
            {heading}
          </div>
        </div>
      )}
      {isHome && (
        <div className="flex justify-between items-center text-center text-sky-950 text-2xl font-bold py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-20">
          {heading}
          <button className="font-bold" onClick={() => handleLogout()}>
              Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

