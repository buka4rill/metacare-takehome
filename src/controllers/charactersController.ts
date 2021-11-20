import axios from "axios";
import { Request, Response } from "express";
import { ICharacters } from "../interfaces/AxiosResultData";

// Get all movie characters
export const getCharacters = async (req: Request, res: Response) => {
  try {
    const people = await axios.get<ICharacters>(
      "https://swapi.dev/api/people/"
    );

    let datas = people.data.results;
    let characterCount = 0;
    let totalHeight;

    const { order, gender, name, height } = req.query;

    const query: any = {};

    if (order) {
      query.order = order;
      if (query.order == "asc") {
        datas = people.data.results.sort((a, b) => {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();

          if (nameA < nameB) return -1;

          if (nameA > nameB) return 1;

          return 0;
        });

        datas.forEach(() => characterCount++);

        totalHeight = datas.reduce((a, b) => {
          return Number(a) + Number(b.height);
        }, 0);

        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "All characters gotten successfully!",
          characterCount,
          totalHeight: totalHeight + " cm",
          totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
          datas,
        });
      } else if (query.order == "desc") {
        datas = people.data.results.sort((a, b) => {
          let nameA = a.name.toLowerCase(),
            nameB = b.name.toLowerCase();

          if (nameA < nameB) return 1;

          if (nameA > nameB) return -1;

          return 0;
        });
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "All characters gotten successfully!",
          characterCount,
          totalHeight: totalHeight + " cm",
          totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
          datas,
        });
      } else {
        return res.status(404).send({
          success: false,
          message: "Wrong search query! Character not found!",
        });
      }
    }

    if (gender) {
      query.gender = gender;

      // datas = people.data.results;
      if (query.gender == "m") {
        datas = people.data.results.filter((data) =>
          data.gender === "male" ? true : false
        );

        datas.forEach(() => characterCount++);

        totalHeight = datas.reduce((a, b) => {
          return Number(a) + Number(b.height);
        }, 0);

        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "All characters gotten successfully!",
          characterCount,
          totalHeight: totalHeight + " cm",
          totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
          datas,
        });
      } else if (query.gender == "f") {
        datas = people.data.results.filter((data) =>
          data.gender === "female" ? true : false
        );

        datas.forEach(() => characterCount++);

        totalHeight = datas.reduce((a, b) => {
          return Number(a) + Number(b.height);
        }, 0);

        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: "All characters gotten successfully!",
          characterCount,
          totalHeight: totalHeight + " cm",
          totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
          datas,
        });
      } else {
        // Check and validate
        return res.status(404).send({
          success: false,
          message: "Wrong search query! Character not found!",
        });
      }
    }

    if (name) {
      query.name = name;
      datas = people.data.results;

      datas.map((data) => {
        if (data.name.match(query.name)) {
          characterCount++;

          // totalHeight = data.reduce((a, b) => {
          //   return Number(a) + Number(b.height);
          // }, 0);

          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "All characters gotten successfully!",
            characterCount,
            // totalHeight: totalHeight + " cm",
            // totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
            datas: data,
          });
        }

        return;
        // return res.status(404).send({
        //   success: false,
        //   message: "Wrong search query! Character not found!",
        // });
      });
    }

    if (height) {
      query.height = height;
      datas = people.data.results;

      datas.map((data) => {
        if (data.height.match(query.height)) {
          characterCount++;

          // totalHeight = totalHeight[data]

          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "All characters gotten successfully!",
            characterCount,
            // totalHeight: totalHeight + " cm",
            // totalHeightInFeets: (Number(totalHeight) / 30.48).toFixed(2) + " ft",
            datas: data,
          });
        }

        return;
        // return res.status(404).send({
        //   success: false,
        //   message: "Wrong search query! Character not found!",
        // });
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "All characters gotten successfully!",
      datas,
    });
  } catch (err) {
    return res.status(422).json({
      success: false,
      message: "Error getting characters!",
      error: err.message,
    });
  }
};
