import dotenv from "dotenv";

dotenv.config();

export const {
  PORT = "3000",
  JWT_SECRET = "your_jwt_secret",
  REFRESH_TOKEN_SECRET = "your_refresh_token_secret",
  JWT_EXPIRATION_TIME = "15m",
  REFRESH_TOKEN_EXPIRATION_TIME = "7d",
} = process.env;