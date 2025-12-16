// api.js — Frontend API helper for Vercel

// Base API path
const API_BASE = "/api"; // ✅ No trailing space

// ---------------- Chatbot APIs ----------------

/**
 * Send a message to the chatbot
 * @param {string} message
 * @returns {Promise<Object>}
 */
export const sendChatMessage = async (message) => {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to send chat message");
  return res.json();
};

/**
 * Get chat history
 * @returns {Promise<Object>}
 */
export const getChatHistory = async () => {
  const res = await fetch(`${API_BASE}/chat/history`);
  if (!res.ok) throw new Error("Failed to get chat history");
  return res.json();
};

/**
 * Clear chat history
 * @returns {Promise<Object>}
 */
export const clearChatHistory = async () => {
  const res = await fetch(`${API_BASE}/chat/clear`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear chat history");
  return res.json();
};

// ---------------- File Upload APIs ----------------

/**
 * Upload a single file
 * @param {string} endpoint - e.g. "/convert/pdf-to-word"
 * @param {File} file
 * @returns {Promise<Object>}
 */
export const uploadFile = async (endpoint, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("File upload failed");
  return res.json();
};

/**
 * Upload multiple files
 * @param {string} endpoint - e.g. "/convert/images-to-pdf"
 * @param {File[]} files
 * @returns {Promise<Object>}
 */
export const uploadFiles = async (endpoint, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Multiple files upload failed");
  return res.json();
};

// ---------------- File Download Helper ----------------

/**
 * Get the full download URL from backend response
 * @param {string} serverPath - e.g. "/api/download/filename.pdf"
 * @returns {string}
 */
export const getDownloadUrl = (serverPath) => {
  // backend already returns full /api/download/filename path
  return serverPath;
};
