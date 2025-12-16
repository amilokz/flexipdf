

// For production on Vercel
const API_BASE = "/api"; 


// ---------------- Chatbot APIs ----------------
export const sendChatMessage = async (message) => {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
};

export const getChatHistory = async () => {
  const res = await fetch(`${API_BASE}/chat/history`);
  return res.json();
};

export const clearChatHistory = async () => {
  const res = await fetch(`${API_BASE}/chat/clear`, { method: "DELETE" });
  return res.json();
};

// ---------------- File Upload APIs ----------------

// Single file upload
export const uploadFile = async (endpoint, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// Multiple files upload
export const uploadFiles = async (endpoint, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  return res.json();
};

// ---------------- File Download URL Helper ----------------
export const getDownloadUrl = (serverPath) => {
  // serverPath = returned download_url from backend
  const filename = serverPath.split("/").pop();
  return `${API_BASE}/download/${filename}`;
};
