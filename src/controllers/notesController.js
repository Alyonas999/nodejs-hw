import createHttpError from "http-errors";
import { Note } from "../models/note.js";


export const getNotes = async (req, res) => {

  const { page = 1, perPage = 10 , tags , search} = req.query;
  const skip = (page - 1) * perPage;


  const notesQuery = Note.find();

   if (tags) {
    notesQuery.where("tag").equals(tags);
  }
  if (search) {
    notesQuery.where({
      $text: { $search: search },
      $content: { $search: search },
    });
  }

  const totalPages = Math.ceil(totalNotes / perPage);

const [totalNotes, notes] = await Promise.all([
   notesQuery.clone().countDocuments(),
    notesQuery.skip(skip).limit(perPage),
]);


  res.status(200).json({
  page,
  perPage,
  totalNotes,
  totalPages,
  notes,
  });
};

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    res.status(200).json(note);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
      new: true,
    });
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    res.status(200).json(note);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findOneAndDelete({ _id: noteId });
    if (!note) {
      return next(createHttpError(404, "Note not found"));
    }
    res.status(200).json(note);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};
