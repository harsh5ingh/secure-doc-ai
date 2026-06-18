import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const savedTheme = localStorage.getItem("theme");

if (!savedTheme || savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="dark"
    />
  </StrictMode>,
)