import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/NotFoundErrorHandler.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const {
    username,
    password,
    email,
    name,
    phoneNumber,
    profilePicture,
    aboutMe,
  } = req.query;
  const hosts = await getHosts(
    username,
    password,
    email,
    name,
    phoneNumber,
    profilePicture,
    aboutMe
  );
  res.status(200).json(hosts);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const host = await getHostById(id);
      if (!host) {
        res.status(404).json({ message: `host with id ${id} not found` });
      } else {
        res.status(200).json(host);
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
      username,
      password,
      email,
      name,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      email,
      name,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    if (newHost === null) {
      res.status(400).send("Host creation failed");
    } else {
      res.status(201).json(newHost);
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
        username,
        password,
        email,
        name,
        phoneNumber,
        profilePicture,
        aboutMe,
      } = req.body;
      const { id } = req.params;
      const newHost = await updateHostById(
        id,
        username,
        password,
        email,
        name,
        phoneNumber,
        profilePicture,
        aboutMe
      );

      if (newHost !== null) {
        res
          .status(200)
          .send({ message: `Host with id ${id} succesfully updated` });
      } else {
        res.status(404).json({ message: `Host with id ${id} not found` });
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
      const deletedHost = await deleteHost(id);
      if (deletedHost) {
        res.status(200).send({
          message: `Host with id ${id} successfully deleted`,
          deletedHost,
        });
      } else {
        res.status(404).json({
          message: `Host with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
