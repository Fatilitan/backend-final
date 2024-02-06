import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import deleteReview from "../services/reviews/deleteReview.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const reviews = await getReviews();
  res.status(200).json(reviews);
});

router.get("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const review = await getReviewById(id);
  if (!review) {
    res.status(404).json({ message: `review with id ${id} not found` });
  } else {
    res.status(200).json(review);
  }
});

router.post("/", async (req, res, next) => {
  // try catch toevoegen
  const { userId, propertyId, rating, comment } = req.body;
  const newReview = await createReview(userId, propertyId, rating, comment);
  res.status(201).json(newReview);
});

router.put("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { userId, propertyId, rating, comment } = req.body;
  const { id } = req.params;
  const newReview = await updateReviewById(
    id,
    userId,
    propertyId,
    rating,
    comment
  );
  res.status(200).json(newReview);
});

router.delete("/:id", async (req, res, next) => {
  // try catch toevoegen
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
});

export default router;
