import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import {TAGS} from '../constants/tags.js';

const objectIdValidator = (value, helpers) => {
  const isValid = isValidObjectId(value);
  return !isValid ? helpers.message("Invalid id format!") : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS).optional(),
    search: Joi.string().allow(""),
  }),
};

/*get*/
export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

/*post*/
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(100).min(1).required(),
    content: Joi.string().max(1000).required(),
    tag: Joi.string().valid(...TAGS).optional(),
  }),
};

/*patch*/
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().max(100),
    content: Joi.string().max(1000),
    tag: Joi.string().valid(
     TAGS
    ),
  }).min(1),
};
