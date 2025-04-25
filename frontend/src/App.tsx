import './App.css'
import Home from "@/pages/Home"
import InfoForm from "@/components/users/InfoForm"
import { PhotoCapture } from "@/components/PhotoCapture"
import { Toaster } from "@/components/ui/sonner"
import Login from "@/components/users/Login"
import Register from "@/components/users/Register"
import Confirm from "@/pages/Confirm"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useAuth } from "@/components/context/AuthContext"

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<PrivateRoute><InfoForm /></PrivateRoute>} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/capture" element={<PhotoCapture />} />
          <Route path="/home" element={<Home />} /> {/* Optional */}
        </Routes>
      </Router>
    </>
  )
}

export default App
