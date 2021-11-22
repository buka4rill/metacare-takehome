import { Router } from "express";
import { check } from "express-validator";

const router = Router();

import {
  createComment,
  getAllComments,
} from "../controllers/commentsController";

// Create a comment
router.post(
  "/api/comment/:movieId",
  [check("comment", "Comment can not be empty").isLength({ max: 500 })], // max of 500 char
  createComment
);

// Get all comments
router.get("/api/comment/all", getAllComments);

export { router as commentsRouter };
