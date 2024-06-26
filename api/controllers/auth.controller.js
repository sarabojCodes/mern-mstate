import User from "../models/user.model.js";
import bycrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res,next) => {
  const { username, email, password } = req.body;
 
  const hashedpassword = bycrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(200).json({
      success:true,
      status: 200,
      message: "create successfully",
    });
  } catch (error) {
    // res.status(500).json(error)
    next(error)
  }
};
