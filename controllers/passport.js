var GoogleStrategy = require("passport-google-oauth20").Strategy;
// const Layout = require("./model/layout");
require("dotenv").config();

const jwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");

const clientID = process.env.ClientID;
const clientSecret = process.env.ClientSecret;
const url = process.env.URL;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: url,
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await Student.findOne({ "google.id": profile.id });
          const student_email = profile.emails[0].value.split("@");
          if (existingUser) {
            return done(null, existingUser);
          }
          if (student_email[1] === "akgec.ac.in") {
            const newUser = new Student({
              method: "google",
              google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile._json.picture,
              },
              details: {
                leader: {
                  name: profile.displayName,
                  email: profile.emails[0].value,
                },
              },
            });
            console.log("Creating new user...");
            await newUser.save();
            return done(null, newUser);
          } else {
            console.log("Wrong Email");
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
  passport.use(
    new jwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: "secretKey",
      },
      async (jwtPayload, done) => {
        try {
          const user = jwtPayload.user;
          console.log(user);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};

module.exports = passport