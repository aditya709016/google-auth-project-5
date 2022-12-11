const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

//defining structure
const layoutSchema = new mongoose.Schema({
  google: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  details: {
      branch: {
        type: String,
      },
      year: {
        type: String,
      },
      studentnumber: {
        type: String,
        default: null,
      },
      rollNumber: {
        type: String,
        default: null,
      },
    },
});
const Layout = mongoose.model("Layout", layoutSchema);
module.exports = Layout;