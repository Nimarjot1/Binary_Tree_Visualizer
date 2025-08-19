// frontend/src/api.js

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

// ✅ Fetch all trees
export async function getTrees() {
  try {
    const res = await fetch(`${API_BASE_URL}/trees`);
    if (!res.ok) throw new Error("Failed to fetch trees");
    return await res.json();
  } catch (error) {
    console.error("Error fetching trees:", error);
    return [];
  }
}

// ✅ Fetch a single tree by ID
export async function getTree(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/trees/${id}`);
    if (!res.ok) throw new Error("Failed to fetch tree");
    return await res.json();
  } catch (error) {
    console.error("Error fetching tree:", error);
    return null;
  }
}

// ✅ Save a new tree
export async function saveTree(treeData) {
  try {
    const res = await fetch(`${API_BASE_URL}/trees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treeData),
    });
    if (!res.ok) throw new Error("Failed to save tree");
    return await res.json();
  } catch (error) {
    console.error("Error saving tree:", error);
    return null;
  }
}

// ✅ Update an existing tree
export async function updateTree(id, treeData) {
  try {
    const res = await fetch(`${API_BASE_URL}/trees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(treeData),
    });
    if (!res.ok) throw new Error("Failed to update tree");
    return await res.json();
  } catch (error) {
    console.error("Error updating tree:", error);
    return null;
  }
}

// ✅ Delete a tree
export async function deleteTree(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/trees/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete tree");
    return await res.json();
  } catch (error) {
    console.error("Error deleting tree:", error);
    return null;
  }
}
