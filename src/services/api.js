// src/services/api.js

const API_BASE_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5001/api";

// Individual functions
async function getTrees() {
  const res = await fetch(`${API_BASE_URL}/trees`);
  if (!res.ok) throw new Error("Failed to fetch trees");
  return await res.json();
}

async function getTree(id) {
  const res = await fetch(`${API_BASE_URL}/trees/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tree");
  return await res.json();
}

async function saveTree(treeData) {
  const res = await fetch(`${API_BASE_URL}/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(treeData),
  });
  if (!res.ok) throw new Error("Failed to save tree");
  return await res.json();
}

async function updateTree(id, treeData) {
  const res = await fetch(`${API_BASE_URL}/trees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(treeData),
  });
  if (!res.ok) throw new Error("Failed to update tree");
  return await res.json();
}

async function deleteTree(id) {
  const res = await fetch(`${API_BASE_URL}/trees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete tree");
  return await res.json();
}

// ▼ Export all functions wrapped under ApiService
export const ApiService = {
  loadTrees: getTrees,
  getTrees,
  getTree,
  saveTree,
  updateTree,
  deleteTree,
};
