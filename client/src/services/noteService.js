import api from "../api/axios";

// GET
export const getNotes = async () => {
  const res = await api.get("/notes");
  return res.data;
};

// CREATE
export const createNote = async (data) => {
  const res = await api.post("/notes", data);
  return res.data;
};

// UPDATE
export const updateNote = async (id, data) => {
  const res = await api.put(`/notes/${id}`, data);
  return res.data;
};

// DELETE
export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};