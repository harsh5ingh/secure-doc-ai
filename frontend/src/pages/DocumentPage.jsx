import {useEffect, useState} from "react"
import axios from "axios"
import { useParams} from "react-router-dom"

function DocumentPage() {

  const {id} = useParams()

  const [document, setDocument] = useState(null)

  useEffect(() => {

    const fetchDocument = async () => {

      try {

        const token = localStorage.getItem("token")

        const response = await axios.get(
          `http://localhost:3000/api/auth/documents/${id}`,
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        )

        setDocument(response.data.document)

      } catch(error) {

        console.log(error);
        
      }
    }

    fetchDocument()
  }, [])

  return(
    
    <div>

      <h1>Document Page</h1>

      {
        document && (
          <div>

            <h2>{document.filename}</h2>

            <pre>{document.content}</pre>
          </div>
        )
      }
    </div>
  )
}

export default DocumentPage