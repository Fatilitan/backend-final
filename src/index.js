import express from "express";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import bookingsRouter from "./routes/bookings.js";
import loginRouter from "./routes/login.js";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/amenities", amenitiesRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/bookings", bookingsRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
