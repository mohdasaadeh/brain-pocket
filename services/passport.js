const passport = require("passport");
const passportGoogleOAuth = require("passport-google-oauth20");

const User = require("../models/User");

const GoogleStrategy = passportGoogleOAuth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/login/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;

      let user = await User.findOne({ googleId: id });

      if (user) return done(null, user);

      user = await new User({
        googleId: id,
        username: displayName,
        email: emails[0].value,
        active: true,
      }).save();

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  if (user) return done(null, user);
});

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
};
