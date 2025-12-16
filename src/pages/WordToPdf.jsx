import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../api";

function WordToPdf() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("Select a Word file first!");
    setLoading(true);

    try {
      const data = await uploadFile("/convert/word-to-pdf", file);
      if (data.status === "success") {
        const filename = data.download_url.split("/").pop();
        setDownloadUrl(`http://localhost:5000/download/${filename}`);
        toast.success("Conversion complete!");
      } else toast.error(data.message || "Conversion failed!");
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">Word → PDF Converter</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? "Converting..." : "Convert Word to PDF"}
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

export default WordToPdf;
