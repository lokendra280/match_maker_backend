import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response, Express } from "express";
import { connectDb } from "./src/scriptdb";
import api from "./src/api/api";
import * as cors from "cors";
dotenv.config();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

const app: Express = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT;
const project = process.env?.PROJECT;
app.use("/api", api);
connectDb();

// connect mongodb





// app.get("/", (req: Request, res: Response) => {
//   res.send("School management system");
// });

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
