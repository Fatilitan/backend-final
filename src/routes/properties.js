import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import deleteProperty from "../services/properties/deleteProperty.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const properties = await getProperties();
  res.status(200).json(properties);
});

router.get("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const property = await getPropertyById(id);
  if (!property) {
    res.status(404).json({ message: `property with id ${id} not found` });
  } else {
    res.status(200).json(property);
  }
});

router.post("/", async (req, res, next) => {
  // try catch toevoegen
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
  res.status(201).json(newProperty);
});

router.put("/:id", async (req, res, next) => {
  // try catch toevoegen
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
  res.status(200).json(newProperty);
});

router.delete("/:id", async (req, res, next) => {
  // try catch toevoegen
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
});

export default router;
