import {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Dashboard(){

  const [documents, setDocuments] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)

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

    const fetchDocuments = async () => {

      try {

        const token = localStorage.getItem("token")

        const response = await axios.get(
          "http://localhost:3000/api/auth/documents",

          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )

        setDocuments(response.data.documents)

      } catch(error) {

        console.log(error);
        
      }
    }

    fetchUser()
    fetchDocuments()
  
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")

    navigate("/login")
  }

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a PDF")
      return
    }

    try {

      const token = localStorage.getItem("token")

      const formData = new FormData()

      formData.append("pdf", file)

      await axios.post(
        "http://localhost:3000/api/auth/upload",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      const docsResponse = await axios.get(
        "http://localhost:3000/api/auth/documents",

        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setDocuments(docsResponse.data.documents)

      alert("PDF uploaded successfully")

    } catch(error) {

      console.log(error.response);

      alert("Upload failed")
      
    }
  }


  return(
    <div className="min-h-screen bg-gray-100 p-8">

  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

    <h1 className="text-5xl font-bold text-red-500 mb-6">
      Dashboard Page
    </h1>

    {
      user && (
        <div className="mb-6">
          <h2 className="text-2xl text-orange-500 font-semibold">
            Email: {user.email}
          </h2>

          <p className="text-gray-600">
            User ID: {user.id}
          </p>
        </div>
      )
    }

    <div className="flex gap-4 items-center mb-8">

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded-lg"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Upload PDF
      </button>

    </div>

    <h2 className="text-3xl font-bold mb-4">
      Your Documents
    </h2>

    <div className="space-y-3">

      {
        documents.map((doc) => (

          <div
            key={doc.id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm"
          >

            <button
              onClick={() => navigate(`/documents/${doc.id}`)}
              className="text-red-400 hover:underline"
            >
              {doc.filename}
            </button>

          </div>

        ))
      }

    </div>

    <button
      onClick={handleLogout}
      className="mt-8 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Log Out
    </button>

  </div>

</div>
  )
}

export default Dashboard