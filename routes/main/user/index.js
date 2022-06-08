const MainUserRouter = require("express").Router();
const passport = require("passport");

const errorHandler = require("../../utils/errorHandler");

MainUserRouter.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  errorHandler(require("./getGoogleAuth"))
);

MainUserRouter.get(
  "/login/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  errorHandler(require("./getGoogleAuthCallback"))
);

MainUserRouter.get("/current_user", errorHandler(require("./getCurrentUser")));

MainUserRouter.get("/logout", errorHandler(require("./logout")));

module.exports = MainUserRouter;
