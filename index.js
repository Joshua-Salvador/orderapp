const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// MAIN ENTRY PAGE

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
