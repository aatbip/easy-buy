import { Request, Response } from "express";
import { IUserCredentials } from "../interfaces/auth.interface";
import { RefreshToken } from "../models/RefreshToken";
import User from "../models/User";
import { asyncWrapper } from "../utils/asyncWrapper";
import { success, failure } from "../utils/responseMessage";

const register = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, password, role, shopName } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json(failure("Please enter all required fields!"));
  }

  let checkEmailExits = await User.findOne({ email: email });

  if (checkEmailExits) {
    return res.status(404).json(failure("Email already exits!"));
  }

  let user = await User.create({ name, email, password, role, shopName });

  return res.status(200).json(success(user));
});

const signIn = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;



  if (!email || !password) {
    return res.status(400).json(failure("Enter all required fields!"));
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json(failure("Username doesn't exist!"));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(400).json(failure("Username or password is incorrect!"));
  }

  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();

  await RefreshToken.create({
    refreshToken: refreshToken,
  });

  const userCredentials: IUserCredentials = {
    id: user._id, 
    name: user.name,
    email,
    role: user.role,
    shopName: user.shopName,  
    accessToken,
    refreshToken,
  };

  res.cookie("userCredentials", JSON.stringify(userCredentials));

  return res.status(200).json(success(userCredentials));
});

const signOut = asyncWrapper((req: Request, res: Response) => {
  res.clearCookie("userCredentials");

  res.status(200).json(success("You are Signed Out!"));
});



export { register, signIn, signOut };
