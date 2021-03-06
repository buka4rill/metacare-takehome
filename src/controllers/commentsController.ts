import { Request, Response } from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "../mikro-orm.config";
import { validationResult } from "express-validator";
import { Comments } from "../entities/Comments";
import axios from "axios";
import { IFilm } from "../interfaces/AxiosResultData";

export const createComment = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  // countComments(movieId);

  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Error(s) found in request!",
      errors: errors.array(),
    });
  }

  // else
  const { comment } = req.body;

  try {
    const orm = await MikroORM.init(mikroConfig);
    const movie = await axios.get<IFilm>(
      `https://swapi.dev/api/films/${movieId}`
    );

    // check
    if (!movie) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Movie not found!"
      })
    }

    // Create comment
    const newComment = orm.em.create(Comments, {
      comment,
      movieId,
      movieEpisodeId: movie.data.episode_id,
      commenterIpAddress: req.socket.remoteAddress,
    });

    // Save to db
    await orm.em.persistAndFlush(newComment);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Comment created successfully!",
      data: newComment,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      message: "Error creating comment!",
      error: err.message,
    });
  }
};

export const getAllComments = async (_: any, res: Response) => {
  try {
    const orm = await MikroORM.init(mikroConfig);

    // comments returned in reverse chronological order
    const comments = await orm.em.find(
      Comments,
      {},
      { orderBy: { createdAt: "DESC" } }
    );
    let commentsCount = 0;

    comments.forEach(() => commentsCount++);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All comments gotten successfully!",
      commentsCount,
      datas: comments,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting comments!",
      error: err.message,
    });
  }
};
