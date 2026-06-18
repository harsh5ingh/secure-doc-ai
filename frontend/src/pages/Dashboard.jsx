import { useEffect, useState, useRef } from "react";
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

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [documents, setDocuments] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null)
  const uploadRef = useRef(null);

  const [notifications, setNotifications] = useState(() => {
  const saved = localStorage.getItem("notifications");
  return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token")

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
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
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/documents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDocuments(response.data.documents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser()
    fetchDocuments()
  
  }, [])

useEffect(() => {
  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
}, [notifications]);

  const addNotification = (type, message) => {
  const notification = {
    id: Date.now(),
    type,
    message,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setNotifications((prev) => [
    notification,
    ...prev,
  ]);
};

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
        `${import.meta.env.VITE_API_URL}/api/auth/upload`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      const docsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/documents`,

        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setDocuments(docsResponse.data.documents)

      console.log("Documents:", docsResponse.data.documents);

      addNotification(
      "upload",
      `${selectedFile.name} uploaded successfully`
  );

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
        `${import.meta.env.VITE_API_URL}/api/auth/documents/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )

      setDocuments(prev =>
        prev.filter(doc => doc.id !== id)
      )

      addNotification(
      "delete",
      "Document deleted successfully"
    );

    } catch(error) {

      console.log(error);

      toast.error("Delete failed")
      
    }
  }

const totalBytes = documents.reduce(
  (sum, doc) => sum + Number(doc.file_size || 0),
  0
);

const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const tableDocuments = documents.map((doc) => ({
  ...doc,
  size: formatFileSize(doc.file_size),
  pages: doc.pages || "-",
  uploadedAt: doc.created_at
    ? new Date(doc.created_at).toLocaleDateString()
    : "Recently",
}));

const latestDoc = [...documents].sort(
  (a, b) => new Date(b.created_at) - new Date(a.created_at)
)[0];

const lastUpload = latestDoc
  ? new Date(latestDoc.created_at).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  : "Never";


  return(
  <DashboardLayout
  currentPath="/dashboard"
  user={user || { name: "User", email: "" }}
  onLogout={handleLogout}
  notifications={notifications}
  onSearch={setSearch}
  onNavigate={navigate}
  sidebarCollapsed={sidebarCollapsed}
  onToggleSidebar={() =>
    setSidebarCollapsed(!sidebarCollapsed)
  }
>
    <WelcomeSection
  name={user?.email?.split("@")[0]}
  onNewUpload={() => uploadRef.current?.openFilePicker()}
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
  value: `${totalMB} MB`,
  hint: "out of 5 GB",
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
     ref={uploadRef}
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