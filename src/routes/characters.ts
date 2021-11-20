import { Router } from "express";

const router = Router();

import { getCharacters } from "../controllers/charactersController";

router.get("/api/characters", getCharacters);
// router.get('/characters/name')

export { router as charactersRouter };
