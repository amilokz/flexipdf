import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFiles } from "../api"; // Ensure this handles multiple files

function ImagesToPdf() {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      return toast.error("Select image files first!");
    }

    setLoading(true);
    setDownloadUrl(""); // Clear previous download

    try {
      const data = await uploadFiles("/convert/images-to-pdf", files);

      if (data.status === "success" && data.download_url) {
        // Ensure full URL
        const filename = data.download_url.split("/").pop();
        setDownloadUrl(`http://localhost:5000/download/${filename}`);
        toast.success("Images merged to PDF!");
      } else {
        toast.error(data.message || "Conversion failed!");
      }
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">Images → PDF</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles([...e.target.files])}
          />
        </Form.Group>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? "Merging..." : "Merge Images to PDF"}
        </Button>
      </Form>

      {downloadUrl && (
        <div className="mt-3">
          <a
            href={downloadUrl}
            download
            className="btn btn-success"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </a>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ImagesToPdf;
