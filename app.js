if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");

require("./services/passport");
const authRouter = require("./routes/authRouter");

const app = express();
mongoose.connect("mongodb://localhost:27017/brain-pocket", () => {
  console.log("Connected with MongoDB on port 27017 >>>");
});

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SESSION_SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(5000, () => {
  console.log("The server side is listening to port 5000 >>>");
});
