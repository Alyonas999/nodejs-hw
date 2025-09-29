import { Router } from 'express';
import {
  getAllNotes,
  getNotesById,
  createNotes,
  deleteNotes,
  updateNotes,
}from '../controllers/notesController.js';

const router = Router();

router.get("/notes", getAllNotes);
router.get("/notes/:notesId", getNotesById);
router.post("/notes", createNotes);
router.delete("/notes/:notesId", deleteNotes);
router.patch("/notes/:notesId", updateNotes);



export default router;
