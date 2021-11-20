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
  [
    check("comment", "Comment can not be empty").not().isEmpty(),
    // check("movieId", "Please put in the id of the movie").not().isEmpty(),
  ],
  createComment
);

// Get all comments
router.get("/api/comment/all", getAllComments);

export { router as commentsRouter };
