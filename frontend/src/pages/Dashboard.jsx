import {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import {FaFilePdf} from "react-icons/fa"

function Dashboard(){

  const [documents, setDocuments] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

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

    setLoading(true)

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

      toast.success("PDF uploaded successfully")

    } catch(error) {

      console.log(error.response);

      toast.error("Upload failed")
      
    } finally {

      setLoading(false)
    }
  }

  const handleDelete = async(id) => {

    try {

      const token = localStorage.getItem("token")

      await axios.delete(
        `http://localhost:3000/api/auth/documents/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setDocuments(
        documents.filter((doc) => doc.id !==id)
      )

      toast.success("Document deleted")

    } catch(error) {

      console.log(error);

      toast.error("Delete failed")
      
    }
  }









  return(

  <div className="min-h-screen bg-gray-100">

  {/* Navbar */}
  <div className="bg-white shadow-sm border-b">

    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600">
        Secure-Doc AI
      </h1>

      <div className="flex items-center gap-4">

        <p className="text-gray-600">
          {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>

  </div>
  <div>
  </div>

  {/* Main Container */}
  <div className="max-w-5xl mx-auto p-6">

   <div className="mb-8">

  <h2 className="text-4xl font-bold text-gray-800">
    Welcome Back 👋
  </h2>

  <p className="text-gray-500 mt-2">
    Upload and manage your PDFs securely
  </p>

</div>

    <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

  <h3 className="text-2xl font-semibold mb-4">
    Upload PDF
  </h3>

  <div className="flex gap-4">

    <input
      type="file"
      accept=".pdf"
      onChange={(e) => setFile(e.target.files[0])}
      className="border p-2 rounded-lg w-full"
    />

    <button
      onClick={handleUpload}
      disabled={loading}
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
    >
      {
        loading ? "Uploading..."

      : "Upload"
}
    </button>

  </div>

</div>

    <div className="bg-white p-6 rounded-2xl shadow-md">

  <input
  type="text"
  placeholder="Searching documents..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
  w-full mb-6 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
      

  <h3 className="text-2xl font-semibold mb-6">
    Your Documents
  </h3>

  <div className="space-y-4">

    {
      documents.filter((doc) => 
        
        doc.filename.toLowerCase().includes(search.toLowerCase())
 ) 
 .map((doc) => (

        <div
          key={doc.id}
          className="
          bg-white border border-gray-200
          rounded-2xl p-5
          hover:shadow-lg
          hover:translate-y-1
          transition duration-300
          flex justify-between items-center"
        >

          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-xl"/>

            <FaFilePdf className="text-red-500 text-2xl" />
            </div>
            <div>
            <button
            onClick={() => navigate( `/documents/${doc.id}`)}
            className="
            text-lg font-semibold text-gray-800
            hover:text-blue-600 transition">
            {doc.filename}
            </button>

            <p className="text-sm text-gray-500 mt-1">
              Secure PDF Document
            </p>
            </div>
          
          {/* RIght Side */}

          <button
            onClick={() => handleDelete(doc.id)}
            className="bg-red-500 text-white
            px-4 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition duration-200"
          >
            Delete
          </button>

        </div>

      ))
    }

  </div>

</div>

  </div>

</div>
)
}

export default Dashboard