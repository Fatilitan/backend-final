import express from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import createUser from "../services/users/createUser.js";
import updateUserById from "../services/users/updateUserById.js";
import deleteUser from "../services/users/deleteUser.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const users = await getUsers();
  res.status(200).json(users);
});

router.get("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    res.status(404).json({ message: `User with id ${id} not found` });
  } else {
    res.status(200).json(user);
  }
});

router.post("/", async (req, res, next) => {
  // try catch toevoegen
  const { username, password, email, name, phoneNumber, profilePicture } =
    req.body;
  const newUser = await createUser(
    username,
    password,
    email,
    name,
    phoneNumber,
    profilePicture
  );
  res.status(201).json(newUser);
});

router.put("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { username, password, email, name, phoneNumber, profilePicture } =
    req.body;
  const { id } = req.params;
  const newUser = await updateUserById(
    id,
    username,
    password,
    email,
    name,
    phoneNumber,
    profilePicture
  );
  res.status(200).json(newUser);
});

router.delete("/:id", async (req, res, next) => {
  // try catch toevoegen
  const { id } = req.params;
  const deletedUser = await deleteUser(id);
  if (deletedUser) {
    res.status(200).send({
      message: `User with id ${id} successfully deleted`,
      deletedUser,
    });
  } else {
    res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }
});

export default router;
