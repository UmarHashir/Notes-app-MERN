const Note = require("../models/Note");
const asyncHandler = require("../utils/asyncHandler");

// GET ALL NOTES (USER SPECIFIC)
const getNotes = asyncHandler(async (req, res) => {
  console.log("REQ USER:", req.user);

  const notes = await Note.find({
  user: req.user.userId,
});

 

  res.json(notes);
});

// CREATE NOTE
const createNote = asyncHandler(async (req, res) => {
    
  const { title, content, category, color } = req.body;

  
  const note = await Note.create({
    title,
    content,
    category,
    color,
    user: req.user.userId,
  });

  res.status(201).json(note);
});

// GET SINGLE NOTE
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error("Access denied");
  }

  res.json(note);
});

// UPDATE NOTE
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error("Access denied");
  }

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;

  const updatedNote = await note.save();

  res.json(updatedNote);
});

// DELETE NOTE
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.userId) {
    res.status(403);
    throw new Error("Access denied");
  }

  await note.deleteOne();

  res.json({
    message: "Note deleted successfully",
  });
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};