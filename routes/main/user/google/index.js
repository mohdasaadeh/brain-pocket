const MainUserGoogleRouter = require("express").Router();
const passport = require("passport");

MainUserGoogleRouter.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  require("./getGoogleAuth")
);

MainUserGoogleRouter.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  require("./getGoogleAuthCallback")
);

module.exports = MainUserGoogleRouter;
