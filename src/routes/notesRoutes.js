import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import { celebrate } from 'celebrate';
import {
  noteIdParamSchema,
  updateNoteSchema,
  getNotesQuerySchema,
  createNoteSchema,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/notes',celebrate(getNotesQuerySchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdParamSchema) , deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
