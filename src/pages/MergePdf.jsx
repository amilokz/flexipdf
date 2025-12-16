import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFiles } from "../api";

function MergePdf() {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) return toast.error("Select at least 2 PDF files!");
    setLoading(true);

    try {
      const data = await uploadFiles("/convert/merge-pdf", files); // ✅ Fixed endpoint
      if (data.status === "success") {
        setDownloadUrl(`http://localhost:5000${data.download_url}`);
        toast.success("PDFs merged!");
      } else toast.error(data.message || "Merge failed!");
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">Merge PDFs</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles([...e.target.files])}
          />
        </Form.Group>
        <Button onClick={handleMerge} disabled={loading}>
          {loading ? "Merging..." : "Merge PDFs"}
        </Button>
      </Form>
      {downloadUrl && (
        <div className="mt-3">
          <a href={downloadUrl} download className="btn btn-success">
            Download PDF
          </a>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default MergePdf;
