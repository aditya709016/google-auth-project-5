const jwt = require("jsonwebtoken");
const SECRET_KEY = "mmnnmmnnmm";

const auth = (req, res, next) => {
  try {
    let token = req.params.token;
    if (token) {
      let user = jwt.verify(token, SECRET_KEY);
      if (user) {
        req.userId = user.id;
        req.userEmail = user.email;
        console.log("valid user");
        next();
      }
    } else {
      console.log("Unvalid User");
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = middleware;