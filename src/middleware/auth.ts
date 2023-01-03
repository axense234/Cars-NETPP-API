import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/jwt";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}

const authenticationMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide a token!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = verifyJWT(token);
    next();
  } catch (error: any) {
    console.log(error.message || "Probably an expired jwt.");
  }
};

export default authenticationMiddleware;
