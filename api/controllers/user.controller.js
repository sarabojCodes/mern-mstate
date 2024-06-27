import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.send("test");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only your own account!"));
console.log(req.params)
  try {
    console.log(req.body)
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log(updatedUser)
    const { password, ...rest } = updatedUser._doc;
    
    res.status(200).json({
      success: true,
      rest,
    });
  } catch (error) {
     next(errorHandler(404,error.message))
  }
};
