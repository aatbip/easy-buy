import http from "http";
import express, { Request, Response } from "express";
require("express-async-errors");
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import helmet from "helmet"; 
import router from "./routes/index";
import { dbConnection } from "./db/dbConnection";
import errorHandler from "./middleware/errorController";

const app = express();
const server = http.createServer(app);

if (process.env.NODE_ENV === "production") {
  app.use(morgan("tiny"));
}

dbConnection();

app.use(helmet()); 
app.use(cookieParser()); 
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
  cors({
    credentials: true,
    origin: `${process.env.PORT}`,
  })
);


app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("EASY BUY API SAYS HELLO TO YOU!");
});

app.all("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({ status: "fail", message: "This route doesn't exist on server!" });
});

app.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`App is running in port ${process.env.PORT}`);
});
