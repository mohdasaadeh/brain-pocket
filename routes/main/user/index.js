const MainUserRouter = require("express").Router();
const passport = require("passport");

MainUserRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  require("./getGoogleAuth")
);

MainUserRouter.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  require("./getGoogleAuthCallback")
);

module.exports = MainUserRouter;
