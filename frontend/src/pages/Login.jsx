import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
      {
        email,
        password
      })

      localStorage.setItem(
        "token",
        response.data.token
      )

      alert("Login Successful")

      console.log(response.data);
      navigate("/dashboard")
    } catch(error) {
      console.log(error);

      alert("Login failed")
      
    }
  }

  return(
    <div>
    <h1>Login Page</h1>

    <form onSubmit={handleLogin}>
      
      <input
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <br/>
      <br/>

      <input
      type="password"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <br/>
      <br/>

      <button type="submit">
        Login
      </button>
    </form>
    </div>
  )
}

export default Login