import { createError } from "../routes/error.js";
import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.user.isAdmin
      ? req.user.id + req.body.to
      : req.body.to + req.user.id,
    sellerId: req.user.isAdmin ? req.user.id : req.body.to,
    buyerId: req.user.isAdmin ? req.body.to : req.user.id,
    readBySeller: req.user.isAdmin,
    readByBuyer: !req.user.isAdmin,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.user.isAdmin
            ? { readBySeller: true }
            : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.user.isAdmin ? { sellerId: req.user.id } : { buyerId: req.user.id }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
