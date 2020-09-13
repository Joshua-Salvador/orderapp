const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/orderappDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

const Organization = require("./model/organization.model");
passport.use(Organization.createStrategy());

passport.serializeUser(Organization.serializeUser());
passport.deserializeUser(Organization.deserializeUser());
//routes
const product = require("./routes/product.route");
const organization = require("./routes/organization.route");

app.use("/product", product);
app.use("/organization", organization);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
