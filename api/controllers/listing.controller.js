import listingModel from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createLisling = async (req, res, next) => {
  try {
    console.log(req.body);
    const listing = await listingModel.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(401, "Listing not fount"));
  }
  console.log(req.user.id, listing.userRef);
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can delete only your own listings!"));
  }
  try {
    await listingModel.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Deleted listing successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listings"));
    }

    const updatedListingfunc = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(updatedListingfunc);
    res.json(updatedListingfunc);
  } catch (error) {
    next(error);
  }
};

export const getListingData = async (req, res, next) => {
  try {
    const isChecktoken = await listingModel.findById(req.params.id);
    if (!isChecktoken) {
      return next(errorHandler(404, "You can get only your own listings!"));
    }
    console.log(isChecktoken)
    res.json(isChecktoken);
  } catch (error) {
    next(error);
  }
};
