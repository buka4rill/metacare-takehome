import { Request, Response } from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "../mikro-orm.config";
import { validationResult } from "express-validator";
import { Comments } from "../entities/Comments";
import axios from "axios";
import { IData } from "../interfaces/AxiosResultData";
// import { moviesRouter } from "src/routes/movies";

let comments_count = 0;

export const createComment = async (req: Request, res: Response) => {
  const { movieId } = req.params;
  // countComments(movieId);

  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      statusCodea: 400,
      message: "Error(s) found in request!",
      errors: errors.array(),
    });
  }

  // else
  const { comment } = req.body;

  try {
    const orm = await MikroORM.init(mikroConfig);
    const movie = await axios.get<IData>(
      `https://swapi.dev/api/films/${movieId}`
    );
    const comments = await orm.em.find(Comments, {});

    const filteredComments = comments.filter(
      (comment) => Number(comment.movieEpisodeId) == movie.data.episode_id
    );

    let commentCount = 0;
    filteredComments.forEach(() => commentCount++);

    console.log(
      "comment: ",
      comment,
      "movieId: ",
      movieId,
      "movieEpisodeId",
      movie.data.episode_id,
      "commentCount: ",
      commentCount
    );

    // Create comment
    const newComment = orm.em.create(Comments, {
      comment,
      movieId,
      movieEpisodeId: movie.data.episode_id,
      commentCount: commentCount + 1,
    });

    // Save to db
    await orm.em.persistAndFlush(newComment);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      data: newComment,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(422).json({
      success: false,
      message: "Error creating comment!",
      error: err.message,
    });
  }
};

export const getAllComments = async (_: any, res: Response) => {
  try {
    const orm = await MikroORM.init(mikroConfig);
    const comments = await orm.em.find(Comments, {});
    // let comment_count = 0;

    // comments.forEach(() => comment_count++);

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All comments gotten successfully!",
      data: comments,
      comments_count,
    });
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Error getting comments!",
      error: err.message,
    });
  }
};

// const countComments = async (id: any) => {
//   try {
//     const orm = await MikroORM.init(mikroConfig);
//     const comments = await orm.em.find(Comments, {});

//     const movie = await axios.get<IData>(`https://swapi.dev/api/films/${id}`);

//     comments.forEach((comment) =>
//       movie.data.episode_id == Number(comment.movieEpisodeId)
//         ? comments_count++
//         : comments_count
//     );

//     // return toBeReturned;
//   } catch (err) {
//     console.error(err.message);
//   }
// };
