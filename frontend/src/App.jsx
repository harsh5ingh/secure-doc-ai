import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import DocumentPage from "./pages/DocumentPage.jsx"

function App(){
  return (
    <BrowserRouter>
    
    <Routes>

  <Route
    path="/"
    element={
      localStorage.getItem("token")
        ? <Navigate to="/dashboard" replace />
        : <Navigate to="/login" replace />
    }
  />

  <Route path="/login" element={<Login />} />

  <Route path="/signup" element={<Signup />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route path="/documents/:id" element={<DocumentPage />} />

</Routes>
      
      </BrowserRouter>
  )
}

export default App
