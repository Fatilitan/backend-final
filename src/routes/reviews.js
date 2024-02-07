import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);
      if (!review) {
        res.status(404).json({ message: `review with id ${id} not found` });
      } else {
        res.status(200).json(review);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const newReview = await createReview(userId, propertyId, rating, comment);

    if (newReview === null) {
      res.status(400).send("Review creation failed");
    } else {
      res.status(201).json(newReview);
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { userId, propertyId, rating, comment } = req.body;
      const { id } = req.params;
      const newReview = await updateReviewById(
        id,
        userId,
        propertyId,
        rating,
        comment
      );
      if (newReview !== null) {
        res
          .status(200)
          .send({ message: `Review with id ${id} succesfully updated` });
      } else {
        res.status(404).json({ message: `Review with id ${id} not found` });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedReview = await deleteReview(id);
      if (deletedReview) {
        res.status(200).send({
          message: `Review with id ${id} successfully deleted`,
          deletedReview,
        });
      } else {
        res.status(404).json({
          deletedReview: `Review with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
