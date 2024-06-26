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
    const { password: undefined, ...rest } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      success: true,
      rest,
    });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        success: true,
        rest,
      });
    } else {
      const dubPass = Math.random().toString(36).slice(-8);
      const generatedPassword = dubPass +""+ dubPass;
      const hashedpassword = bycrypt.hashSync(generatedPassword,10)
      const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase()+""+dubPass,email:req.body.email,password:hashedpassword,avatar:req.body.photo})
      await newUser.save();
      const token =  jwt.sign({id:newUser._id},process.env.JWT_SECRET)
      const {password:pass,...rest} = newUser._doc
      res.cookie('access_token',token).status(200).json({
        success:true,
        rest
      })
    }
  } catch (error) {
    next(error);
  }
};


export const signout = (req,res,next)=>{
    try{
       res.status(200).clearCookie('access_token').json({
        success:true,
        message:"logout successfully"
       })
    }catch(error){

    }
}
