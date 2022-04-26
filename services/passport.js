const passport = require("passport");
const passportGoogleOAuth = require("passport-google-oauth20");

const User = require("../models/User");

const GoogleStrategy = passportGoogleOAuth.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const oldUser = await User.findOne({ googleId: id });

      if (oldUser) {
        return done(null, oldUser);
      }

      const newUser = await new User({
        googleId: id,
        username: displayName,
        email: emails[0].value,
        active: true,
      }).save();

      return done(null, newUser);
    }
  )
);
passport.serializeUser((user, done) => {
  return done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  if (user) {
    return done(null, user);
  }
});
