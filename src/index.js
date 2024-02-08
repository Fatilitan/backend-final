import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import usersRouter from "./routes/users.js";
import amenitiesRouter from "./routes/amenities.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import reviewsRouter from "./routes/reviews.js";
import bookingsRouter from "./routes/bookings.js";
import loginRouter from "./routes/login.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: "https://0001280edea71c9444f88f60f23e0aa4@o4506472839446528.ingest.sentry.io/4506710707208192",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

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

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
