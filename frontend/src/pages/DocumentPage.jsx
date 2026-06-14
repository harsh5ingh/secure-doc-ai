import {useEffect, useState} from "react"
import axios from "axios"
import { useParams} from "react-router-dom"
import { ArrowLeft, FileText, Bot, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DocumentPage() {

  const navigate = useNavigate();
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
  },[id])

  if (!document) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      Loading document...
    </div>
  );
}

const wordCount =
  document?.content?.trim()?.split(/\s+/).length || 0;

const charCount =
  document?.content?.length || 0;

const readingTime =
  Math.max(1, Math.ceil(wordCount / 200));

  return (
    
  <div className="min-h-screen bg-background text-foreground p-6 lg:p-10">
    
    {document && (
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-3 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold">
              {document.filename}
            </h1>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Extracted Text */}
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">

            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <FileText className="h-5 w-5" />
                Extracted Text
              </h2>

              <button
                onClick={() => {
  navigator.clipboard.writeText(document.content || "");
  toast.success("Copied to clipboard");
}}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>

            <div className="max-h-[600px] overflow-y-auto rounded-xl bg-muted/30 p-4">
              <pre className="whitespace-pre-wrap text-sm leading-7">
                {document.content}
              </pre>
            </div>
          </div>

          {/* Metadata */}

          <div className="space-y-6">

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">
                Document Details
              </h3>

              <div className="space-y-4 text-sm">

                <div>
                  <p className="text-muted-foreground">
                    File Name
                  </p>

                  <p className="font-medium break-all">
                    {document.filename}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Uploaded
                  </p>

                  <p className="font-medium">
                    {document.created_at
                      ? new Date(document.created_at).toLocaleString("en-IN")
                      : "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    Words
                  </p>

                  <p className="font-medium">
                    {document.content?.split(" ").length || 0}
                  </p>
                </div>

                <div>
  <p className="text-muted-foreground">
    Characters
  </p>

  <p className="font-medium">
    {charCount.toLocaleString()}
  </p>
</div>

<div>
  <p className="text-muted-foreground">
    Reading Time
  </p>

  <p className="font-medium">
    {readingTime} min
  </p>
</div>

              </div>
            </div>

            {/* AI Section */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">
                  AI Assistant
                </h3>
              </div>

             <div className="space-y-3">
  <div className="rounded-lg bg-primary/10 p-3 text-sm">
    ✨ Summarize document
  </div>

  <div className="rounded-lg bg-primary/10 p-3 text-sm">
    ✨ Extract key points
  </div>

  <div className="rounded-lg bg-primary/10 p-3 text-sm">
    ✨ Ask questions about PDF
  </div>
</div>

              <button
                disabled
                className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground opacity-50"
              >
                Coming Soon
              </button>
            </div>

          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default DocumentPage;