import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

connectToDatabase()
  .then(() => {
    app.use("/", routes);

    app.listen(process.env.PORT, () => {
      console.log(
        `the server is running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
