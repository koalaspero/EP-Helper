import Header from "../components/Header";
import assets1 from "../assets/diagnosis.png";
import assets2 from "../assets/user.png";
export default function AdminPrincipalPage() {
  return (
    <>
      <Header
        heading="Inicio"
        // paragraph="Don't have an account yet? "
        // linkName="Signup"
        // linkUrl="/signup"
      />
      <h1 className="font-bold text-2xl text-center pt-2">
        Bienvenido, Administrador
      </h1>
      <div className="flex justify-center">
        <div className="flex justify-center space-x-20 pt-8">
          <div className="flex flex-col items-center rounded-lg bg-principal cursor-pointer option_navbar transform transition duration-1000 hover:scale-110">
            <img src={assets2} alt="" className="admin_image mt-7" />
            <p className="font-bold text-xl pt-6">Usuarios</p>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-principal cursor-pointer option_navbar transform transition duration-1000 hover:scale-110">
            <img src={assets1} alt="" className="admin_image mt-7" />
            <p className="font-bold text-xl pt-6">Diagnóstico</p>
          </div>
        </div>
      </div>
    </>
  );
}
