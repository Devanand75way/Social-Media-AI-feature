import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";
const prisma = new PrismaClient();
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../helper/token.helper";

export const createUser = async (username: string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password : hashSync(password , 10),
    },
  });
};

export const login = async (email: string, password: string) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      email: email.toString(),
    },
  });
  if (!foundUser) {
    throw new Error(" User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password.toString(), // plain password
    foundUser.password // Hash Password
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }
  const data = { userid: foundUser.id, email: foundUser.email };

  const accesstoken = generateAccessToken(data);
  const refreshtoken = generateRefreshToken(data);

  return { ...foundUser, accesstoken, refreshtoken };
};