import listingModel from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";

export const test = (req, res) => {
  res.send("test");
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can update only your own account!"));
  console.log(req.params);
  try {
    console.log(req.body);
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
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      success: true,
      rest,
    });
  } catch (error) {
    next(errorHandler(404, error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  console.log(req.params.id, req.user._id);
  if (req.params.id !== req.user.id)
    return next(errorHandler(401, "You can delete only your own account"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).clearCookie("access_token").json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {

       
        const listings = await listingModel.find({userRef:req.params.id});
        res.status(200).json(listings)
    } catch (errr) {
      next(errr)
    }
  } else {

    next(errorHandler(401,"You can only view your own listings"))
  }
};
