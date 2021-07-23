const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

require("dotenv").config();

const users = require("./routes/api/userRouter");
const products = require("./routes/api/productRouter");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const db = process.env.mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

require("./models/userModel");
require("./models/orderModel");
require("./models/productModel");
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/products", products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
