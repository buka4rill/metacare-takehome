import { Router } from "express";

const router = Router();

import { getAllMovies } from "../controllers/moviesController";

router.get("/api/movies", getAllMovies);

export { router as moviesRouter };
