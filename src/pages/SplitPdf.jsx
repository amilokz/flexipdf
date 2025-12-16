import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../api";

function SplitPdf() {
  const [file, setFile] = useState(null);
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSplit = async () => {
    if (!file) return toast.error("Select a PDF file!");
    setLoading(true);

    try {
      const data = await uploadFile("/convert/split-pdf", file); // ✅ Fixed endpoint
      if (data.status === "success") {
        setDownloadUrls(data.files.map(f => `http://localhost:5000${f}`)); // multiple pages
        toast.success("PDF split successfully!");
      } else toast.error(data.message || "Split failed!");
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">Split PDF</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button onClick={handleSplit} disabled={loading}>
          {loading ? "Splitting..." : "Split PDF"}
        </Button>
      </Form>

      {downloadUrls.length > 0 && (
        <div className="mt-3 d-flex flex-wrap justify-content-center">
          {downloadUrls.map((url, idx) => (
            <a
              key={idx}
              href={url}
              download
              className="btn btn-success m-2"
            >
              Download Page {idx + 1}
            </a>
          ))}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default SplitPdf;
