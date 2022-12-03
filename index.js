const express = require("express");
const routes = require("./routes");
const app = express();
const port = 3000;
app.use(express.json())

const mongoose = require("mongoose");
app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://andrii_tw:dKRbikNyWjKAHKsn@cluster0.65gsbzp.mongodb.net/Andrii-Batrinac-Ambrinos?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
