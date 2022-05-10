const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
mongoose.connect("mongodb://localhost:27017/brain-pocket", () => {
  console.log("Connected with MongoDB on port 27017 >>>");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} else {
  app.use(express.static("brain-pocket-frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "brain-pocket-frontend", "build", "index.html")
    );
  });
}

require("./services/cookieSession")(app);
require("./services/passport")(app);
require("./routes")(app);

app.listen(5000, () => {
  console.log("The server side is listening to port 5000 >>>");
});
