import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const amenities = await getAmenities(name);
  res.status(200).json(amenities);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);
      if (!amenity) {
        res.status(404).json({ message: `Amenity with id ${id} not found` });
      } else {
        res.status(200).json(amenity);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);

    if (newAmenity === null) {
      res.status(400).send("Amenity creation failed");
    } else {
      res.status(201).json(newAmenity);
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
      const { name } = req.body;
      const { id } = req.params;
      const newAmenity = await updateAmenityById(id, name);
      if (newAmenity !== null) {
        res
          .status(200)
          .send({ message: `Amenity with id ${id} succesfully updated` });
      } else {
        res.status(404).json({ message: `Amenity with id ${id} not found` });
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
      const deletedAmenity = await deleteAmenity(id);
      if (deletedAmenity) {
        res.status(200).send({
          message: `Amenity with id ${id} successfully deleted`,
          deletedAmenity,
        });
      } else {
        res.status(404).json({
          message: `Amenity with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
