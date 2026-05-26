import {useState} from "react"
import axios from "axios"

function Signup(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async(e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password
        }
      )

      console.log(response.data);

      alert("Signup successful")
    } catch (error) {
      console.log(error);

      alert("Signup failed")
      
    }
  }

  return(
    <div>
      <h1>SignUp</h1>

      <form onSubmit={handleSignup}>

        <input 
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup