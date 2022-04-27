const cookieSession = require("cookie-session");

module.exports = function (app) {
  app.use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_SESSION_SECRET],
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
  );
};
