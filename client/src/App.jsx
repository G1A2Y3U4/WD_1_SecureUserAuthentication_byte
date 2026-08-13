import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Attendance from "./pages/Attendance";

import ProtectedRoute from "./components/ProtectedRoute";
import Leave from "./pages/Leave";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <Employees />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-employee"
                    element={
                        <ProtectedRoute>
                            <AddEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/edit-employee/:id"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute>
                            <Attendance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/leaves"
                    element={
                        <ProtectedRoute>
                            <Leave />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;