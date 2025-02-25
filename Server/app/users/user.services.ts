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
  console.log(email, password)
  const foundUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!foundUser) {
    console.log("User not found")
    throw new Error(" User not found");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password.toString(), // plain password
    foundUser.password // Hash Password
  );
  if (!isPasswordCorrect) {
    console.log("Invalid Password")
    throw new Error("Invalid password");
  }
  const data = { userid: foundUser.id, email: foundUser.email };

  const accesstoken = generateAccessToken(data);
  const refreshtoken = generateRefreshToken(data);

  return { ...foundUser, accesstoken, refreshtoken };
};