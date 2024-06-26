import User from "../models/user.model.js";
import bycrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashedpassword = bycrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedpassword });
  try {
    await newUser.save();
    res.status(200).json({
      success: true,
      status: 200,
      message: "create successfully",
    });
  } catch (error) {
    // res.status(500).json(error)
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bycrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password:undefined, ...rest } = validUser._doc;
    

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      rest,
    });
  } catch (error) {
    next(error);
  }
};
