import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Attendance from "./pages/Attendance";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/edit-employee/:id"element={<EditEmployee />} />
                <Route path="/attendance" element={<Attendance />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;