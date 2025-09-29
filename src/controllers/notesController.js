import createHttpError from 'http-errors';
import { Notes } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await Notes.find();
  res.status(200).json(notes);
};


export const getNotesById = async (req, res, next) => {
  const { notesId } = req.params;
  const notes = await Notes.findById(notesId);

  if (!notes) {
    next(createHttpError(404, 'Note not found'));
    return;
  }

  res.status(200).json(notes);
};

export const createNotes = async (req, res) => {
  const notes = await Notes.create(req.body);
  res.status(201).json(notes);
};

export const deleteNotes = async (req, res, next) => {
  const { notesId } = req.params;
  const notes = await Notes.findOneAndDelete({
    _id: notesId,
  });
  if (!notes) {
    next(createHttpError(404, "Notes not found"));
    return;
  }
  res.status(200).send(notes);
};

export const updateNotes = async (req, res, next) => {
  const { notesId } = req.params;
  const notes = await Notes.findOneAndUpdate(
    { _id: notesId },
    req.body,
    { new: true },
  );

  if (!notes) {
    next(createHttpError(404, 'Notes not found'));
    return;
  }

  res.status(200).json(notes);
};
