import Login from "./components/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
