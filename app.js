if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const mongoUrl =
  process.env.MONGODB_ATLAS || "mongodb://localhost:27017/brain-pocket";
const port = process.env.PORT || 5000;

mongoose.connect(mongoUrl, () => {
  console.log("Connected with MongoDB >>>");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./services/cookieSession")(app);
require("./services/passport")(app);
require("./routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("brain-pocket-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "brain-pocket-frontend", "build", "index.html")
    );
  });
}

app.listen(port, () => {
  console.log(`The server side is listening to port ${port} >>>`);
});
