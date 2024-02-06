import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHost from "../services/hosts/deleteHost.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const hosts = await getHosts();
  res.status(200).json(hosts);
});

router.get("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const host = await getHostById(id);
  if (!host) {
    res.status(404).json({ message: `host with id ${id} not found` });
  } else {
    res.status(200).json(host);
  }
});

router.post("/", async (req, res, next) => {
  // try catch toevoegen
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
  res.status(201).json(newHost);
});

router.put("/:id", async (req, res, next) => {
  // try catch toevoegen
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
  res.status(200).json(newHost);
});

router.delete("/:id", async (req, res, next) => {
  // try catch toevoegen
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
});

export default router;
