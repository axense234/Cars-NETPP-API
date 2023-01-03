import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// CREATE JWT
const createJWT = (uid: string, firstName: string) => {
  return jwt.sign({ uid, firstName }, process.env.SECRET_JWT_KEY as string, {
    expiresIn: "2d",
  });
};

// VERIFY JWT
const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.SECRET_JWT_KEY as string);
};

// Exports
export { createJWT, verifyJWT };
