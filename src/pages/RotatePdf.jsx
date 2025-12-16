import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../api";

function RotatePdf() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRotate = async () => {
    if (!file) return toast.error("Select a PDF file!");
    setLoading(true);

    try {
      const data = await uploadFile("/convert/pdf-to-word", file); // Replace with rotate endpoint if exists
      if (data.status === "success") {
        const filename = data.download_url.split("/").pop();
        setDownloadUrl(`http://localhost:5000/download/${filename}`);
        toast.success("PDF rotated!");
      } else toast.error(data.message || "Rotation failed!");
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">Rotate PDF</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Form.Group>
        <Button onClick={handleRotate} disabled={loading}>
          {loading ? "Rotating..." : "Rotate PDF"}
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

export default RotatePdf;
