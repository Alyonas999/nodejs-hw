import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  const isValid = isValidObjectId(value);
  return !isValid ? helpers.message("Invalid id format!") : value;
};

export const getNotesQuerySchema = {
  [Segments.QUERY]: {
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(15).default(10),
    tag: Joi.string().valid('Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
      'Todo'),
    search: Joi.string().trim().allow("")
  },
};


/*get*/
export const noteIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

/*post*/
export const createNoteSchema = {
  [Segments.BODY]: Joi.object()({
    title: Joi.string().max(100).required(),
    content: Joi.string().max(1000).required(),
    tag: Joi.string()  (
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
      "Ideas",
      "Travel",
      "Finance",
      "Health",
      "Important",
      "Todo"
    ).default("Todo"),
  }),
};

/*patch*/
export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object()({
    title: Joi.string().max(100),
    content: Joi.string().max(1000),
    tag: Joi.string() (
      "Work",
      "Personal",
      "Meeting",
      "Shopping",
      "Ideas",
      "Travel",
      "Finance",
      "Health",
      "Important",
      "Todo"
    ),
  }).min(1),
};

