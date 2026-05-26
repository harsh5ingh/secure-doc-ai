import {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Dashboard(){

  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token")

        const response = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )

        setUser(response.data.user)

      } catch(error) {
        console.log(error);
        
      }

    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")

    navigate("/login")
  }


  return(
    <div>
    <h1>Dashboard Page</h1>

    {
      user && (
        <div>
          <h2>
            Email:{user.email}
          </h2>

          <p>
            User ID: {user.id}
          </p>
        </div>
      )
    }
    <button onClick={handleLogout}>
      Log Out
    </button>
    </div>
  )
}

export default Dashboard