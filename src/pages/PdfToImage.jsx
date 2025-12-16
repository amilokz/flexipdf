import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFile } from "../api";

function PdfToImage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("Select a PDF file first!");
    setLoading(true);

    try {
      const data = await uploadFile("/convert/pdf-to-images", file);
      if (data.status === "success") {
        // Add full backend URL
        setImages(data.images.map((img) => `http://localhost:5000${img}`));
        toast.success("PDF converted to images!");
      } else toast.error(data.message || "Conversion failed!");
    } catch (err) {
      toast.error("Server error. Check backend!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="text-center py-5">
      <h2 className="mb-4">PDF → Images</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button onClick={handleUpload} disabled={loading}>
          {loading ? "Converting..." : "Convert PDF to Images"}
        </Button>
      </Form>

      <div className="mt-4 d-flex flex-wrap justify-content-center">
        {images.map((img, idx) => (
          <div key={idx} className="m-2 text-center">
            <img
              src={img}
              alt={`page-${idx}`}
              className="border"
              style={{ width: 150 }}
            />
            <div className="mt-2">
              <a href={img} download={`page-${idx + 1}.png`}>
                <Button size="sm" variant="success">
                  Download
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PdfToImage;
