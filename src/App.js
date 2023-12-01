import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import AdminPrincipalPage from "./pages/AdminPrincipal";
function App() {
  return (
    <div className="min-h-full h-screen flex justify-center bg-stone-200">
      <div className="max-w-full w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={<AdminPrincipalPage />} />
            <Route path="/usuarios_admin" element={<AdminPrincipalPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
