import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const properties = await getProperties();
  res.status(200).json(properties);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const property = await getPropertyById(id);
      if (!property) {
        res.status(404).json({ message: `property with id ${id} not found` });
      } else {
        res.status(200).json(property);
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds,
    } = req.body;
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathroomCount,
      maxGuestCount,
      hostId,
      rating,
      amenityIds
    );

    if (newProperty === null) {
      res.status(400).send("Property creation failed");
    } else {
      res.status(201).json(newProperty);
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
      const {
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathroomCount,
        maxGuestCount,
        hostId,
        rating,
        amenityIds,
      } = req.body;
      const { id } = req.params;
      const newProperty = await updatePropertyById(
        id,
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathroomCount,
        maxGuestCount,
        hostId,
        rating,
        amenityIds
      );
      if (newProperty !== null) {
        res
          .status(200)
          .send({ message: `Property with id ${id} succesfully updated` });
      } else {
        res.status(404).json({ message: `Property with id ${id} not found` });
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
      const deletedProperty = await deleteProperty(id);
      if (deletedProperty) {
        res.status(200).send({
          message: `Property with id ${id} successfully deleted`,
          deletedProperty,
        });
      } else {
        res.status(404).json({
          message: `Property with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
