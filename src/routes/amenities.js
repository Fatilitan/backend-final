import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const amenities = await getAmenities();
  res.status(200).json(amenities);
});

router.get("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const amenity = await getAmenityById(id);
  if (!amenity) {
    res.status(404).json({ message: `Amenity with id ${id} not found` });
  } else {
    res.status(200).json(amenity);
  }
});

router.post("/", async (req, res, next) => {
  // try catch toevoegen
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  res.status(201).json(newAmenity);
});

router.put("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { name } = req.body;
  const { id } = req.params;
  const newAmenity = await updateAmenityById(id, name);
  res.status(200).json(newAmenity);
});

router.delete("/:id", async (req, res, next) => {
  // try catch toevoegen
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
});

export default router;