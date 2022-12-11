const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressLayouts = require("express-ejs-layouts");

require("../controllers/passport");
require("dotenv").config();
require("./connectdb/connect");
const port = process.env.PORT;
const app = express();

app.use(expressLayouts);
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const routes = require("./routes/router");

app.use(routes);

app.listen(port, function () {
  console.log(`Server is up ${port}`);
});