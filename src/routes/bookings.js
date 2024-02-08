import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  } = req.query;
  const bookings = await getBookings(
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus
  );
  res.status(200).json(bookings);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await getBookingById(id);
      if (!booking) {
        res.status(404).json({ message: `booking with id ${id} not found` });
      } else {
        res.status(200).json(booking);
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
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    if (newBooking === null) {
      res.status(400).send("Booking creation failed");
    } else {
      res.status(201).json(newBooking);
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
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      } = req.body;
      const { id } = req.params;
      const newBooking = await updateBookingById(
        id,
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      if (newBooking !== null) {
        res
          .status(200)
          .send({ message: `Booking with id ${id} succesfully updated` });
      } else {
        res.status(404).json({ message: `Booking with id ${id} not found` });
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
      const deletedBooking = await deleteBooking(id);
      if (deletedBooking) {
        res.status(200).send({
          message: `Booking with id ${id} successfully deleted`,
          deletedBooking,
        });
      } else {
        res.status(404).json({
          deletedBooking: `Booking with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
