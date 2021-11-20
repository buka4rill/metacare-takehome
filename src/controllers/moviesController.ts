import axios from "axios";
import { Response } from "express";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "../mikro-orm.config";
import { Comments } from "../entities/Comments";
import { IFilms } from "src/interfaces/AxiosResultData";

export const getAllMovies = async (_: any, res: Response) => {
  // title, opening crawls, release dates (sorted), comment counts
  try {
    const movies = await axios.get<IFilms>("https://swapi.dev/api/films/");

    const orm = await MikroORM.init(mikroConfig);
    const comments = await orm.em.find(Comments, {});

    // Get datas and sort by release date
    let datas = movies.data.results.sort(
      (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );

    // Loop thru API results

    let obj = datas.map((data, i: number) => {
      let id = i + 1;

      let comment = comments.filter(
        (comment) => Number(comment.movieEpisodeId) == data.episode_id
      );

      return {
        id,
        movie_name: data.title,
        opening_crawl: data.opening_crawl,
        release_date: data.release_date,
        comment_count: comment.length,
      };
    });

    // return payload
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All movies gotten successfully",
      data: obj,
    });
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Error getting movies!",
      error: err.message,
    });
  }
};
