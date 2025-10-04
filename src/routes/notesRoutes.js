import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
}from '../controllers/notesController.js';

const router = Router();

router.get("/note", getAllNotes);
router.get("/note/:noteId", getNoteById);
router.post("/note", createNote);
router.delete("/note/:noteId", deleteNote);
router.patch("/note/:noteId", updateNote);



export default router;
