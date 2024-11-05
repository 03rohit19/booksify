import { Routes, Route } from "react-router-dom";
// Components
import NavbarPage from "./components/Navbar";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import List from "./pages/List";

// CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
