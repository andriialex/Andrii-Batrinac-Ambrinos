import express from "express";
import router from "./routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cookieParser())
app.use(express.json());
app.use(cors())

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
