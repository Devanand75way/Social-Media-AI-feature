import jwt from "jsonwebtoken";
const  JWT_SECRET  = process.env.JWT_SECRET;
interface JWT_payload {
  userid: string;
  email: string;
}

export const generateAccessToken = (payload: JWT_payload) => {
  return jwt.sign(payload, String(JWT_SECRET), { expiresIn: "1h" });
};

export const generateRefreshToken = (payload: JWT_payload) => {
    return jwt.sign(payload, String(JWT_SECRET), { expiresIn: "7d" });
}