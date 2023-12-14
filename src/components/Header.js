export default function Header({
  heading,
  isHome = false  // Optional parameter with a default value of false
}) {
  return (
    <div className={`w-full bg-principal shadow ${isHome ? 'mb-10' : 'mb-5'}`}>
      <div className="flex justify-between items-center text-center text-sky-950 text-2xl font-bold py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-20">
        {heading}
        {isHome && (
          <button
            className="text-001F3F bg-EDEBD7 px-4 py-2 rounded-full"
            onClick={() => handleLogout()}
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </div>
  );
}

// Function to handle logout (replace it with your actual logout logic)
function handleLogout() {
  // Add your logout logic here
  console.log('Logout logic goes here');
}


