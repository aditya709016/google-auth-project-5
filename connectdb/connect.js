const mongoose = require("mongoose");
require("dotenv").config();

const conn_str =
  "mongodb+srv://AdityaRajSharma:Aditya@brl@newcluster.way4kzj.mongodb.net/test"

mongoose.connect(
  conn_str,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
      console.log("error");
    } else {
      console.log("connected...");
    }
  }
);