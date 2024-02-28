const express = require("express");
const { urlencoded } = require("express");
const cors = require("cors");
const serveStatic = require("express").static;

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(serveStatic("docs"));

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});
