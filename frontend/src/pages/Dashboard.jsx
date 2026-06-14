import {useEffect, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { FileText, HardDrive, Clock } from "lucide-react";

import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { StatsGrid } from "../components/dashboard/StatsGrid";
import { UploadDropzone } from "../components/dashboard/UploadDropzone";
import { RecentDocumentsTable } from "../components/dashboard/RecentDocumentsTable";

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

  const handleUpload = async (selectedFile) => {

    if (!selectedFile) {
      alert("Please select a PDF")
      return
    }

    setLoading(true)

    try {

      const token = localStorage.getItem("token")

      const formData = new FormData()

      formData.append("pdf", selectedFile)

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

      alert(JSON.stringify(docsResponse.data.documents[0], null, 2))

      console.log("Documents:", docsResponse.data.documents);

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

const tableDocuments = documents.map((doc) => ({
  ...doc,
  size: doc.size || "PDF",
  pages: doc.pages || "-",
  uploadedAt: doc.created_at
    ? new Date(doc.created_at).toLocaleDateString()
    : "Recently",
}));

const lastUpload =
  documents.length > 0
    ? new Date(documents[documents.length - 1].created_at)
        .toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
    : "Never";


  return(
  <DashboardLayout
  currentPath="/dashboard"
  user={user || { name: "User", email: "" }}
  onLogout={handleLogout}
  onSearch={setSearch}
  onNavigate={navigate}
>
    <WelcomeSection
      name={user?.email?.split("@")[0]}
    />

    <StatsGrid
  stats={[
    {
      label: "Total Documents",
      value: documents.length.toString(),
      hint: "Documents uploaded",
      hintTone: "success",
      icon: FileText,
    },
    {
      label: "Storage Used",
      value: `${documents.length} PDFs`,
      hint: "Storage tracking soon",
      hintTone: "muted",
      icon: HardDrive,
    },
    {
  label: "Last Upload",
  value: lastUpload,
  hint: "Synced",
  hintTone: "success",
  icon: Clock,
    },
  ]}
/>

   <UploadDropzone
     onFilesSelected={(files) => {
     const selectedFile = files[0]

     setFile(selectedFile)

     handleUpload(selectedFile)
    }}
    />

    <RecentDocumentsTable
  documents={tableDocuments}
  onOpen={(doc) => navigate(`/documents/${doc.id}`)}
  onDelete={(doc) => handleDelete(doc.id)}
/>
  </DashboardLayout>
)
}

export default Dashboard