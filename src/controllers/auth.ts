import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";
import { comparePasswords, encryptPassword } from "../utils/bcrypt";
import { createJWT } from "../utils/jwt";
import { Owner } from "../utils/prismaClient";

dotenv.config();

// CREATE OWNER/SIGN UP OWNER
const createOwner = async (req: Request, res: Response) => {
  const ownerBody = req.body;

  ownerBody.password = await encryptPassword(ownerBody.password);

  const createdOwner = await Owner.create({ data: { ...ownerBody } });

  if (!createdOwner) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Could not create ownert!", owner: {} });
  }

  const token = createJWT(createdOwner.owner_uid, createdOwner.first_name);

  return res.status(StatusCodes.CREATED).json({
    msg: `Successfully created owner with UID:${createdOwner.owner_uid}`,
    token,
    owner: createdOwner,
  });
};

// LOGIN OWNER
const loginOwner = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide both password and email!" });
  }

  const foundOwner = await Owner.findUnique({ where: { email } });

  if (!foundOwner) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Could not find user with email:${email}...` });
  }

  const passMatch = await comparePasswords(password, foundOwner.password);

  if (!passMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Passwords do not match!" });
  }

  const token = createJWT(foundOwner.owner_uid, foundOwner.first_name);

  return res.status(StatusCodes.OK).json({
    msg: `Successfully logged in as ${foundOwner.first_name}!`,
    token,
    owner: foundOwner,
  });
};

// SWAGGER AUTHORIZATION
const swgAuthorization = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide both username and password." });
  }

  if (username !== process.env.SWAGGER_AUTH_USERNAME) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Usernames do not match." });
  }

  if (password !== process.env.SWAGGER_AUTH_PASSWORD) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Passwords do not match." });
  }

  const token = createJWT(username, password);

  return res.status(StatusCodes.OK).json({ token });
};

// EXPORTS
export { createOwner, loginOwner, swgAuthorization };
