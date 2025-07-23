import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shered/Navbar";

function App() {
  return (
    <div className="root">
      <Navbar />

      <Outlet />
    </div>
  );
}

export default App;
