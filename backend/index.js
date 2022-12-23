import express from "express";
import router from "./routes.js"
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use(cookieParser())

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
