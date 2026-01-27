import express from "express";
import cors from "cors";
import helmet from "helmet";
import {xss} from "express-xss-sanitizer";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./src/routes/api.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

  app.set('json spaces', 2);

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(xss());
app.use(hpp());
app.use(cookieParser());
app.use(
  express.json({
    limit: "50mb",
  }),
);

// Rate Limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000,
  }),
);

// Routes
app.use("/routes/api", router);

const PORT = 5030;

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
export default app;
