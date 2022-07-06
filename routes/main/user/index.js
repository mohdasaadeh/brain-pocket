const MainUserRouter = require("express").Router();
const passport = require("passport");

const errorHandler = require("../../utils/errorHandler");
const isLoggedIn = require("../../utils/isLoggedIn");
const isLoggedOut = require("../../utils/isLoggedOut");

MainUserRouter.get(
  "/login/google",
  isLoggedOut,
  passport.authenticate("google", { scope: ["profile", "email"] }),
  errorHandler(require("./getGoogleAuth"))
);

MainUserRouter.get(
  "/login/google/callback",
  isLoggedOut,
  passport.authenticate("google", { failureRedirect: "/login" }),
  errorHandler(require("./getGoogleAuthCallback"))
);

MainUserRouter.get("/current_user", errorHandler(require("./getCurrentUser")));

MainUserRouter.get("/logout", isLoggedIn, errorHandler(require("./logout")));

module.exports = MainUserRouter;
