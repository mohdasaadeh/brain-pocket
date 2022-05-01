if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb://localhost:27017/brain-pocket", () => {
  console.log("Connected with MongoDB on port 27017 >>>");
});

require("./services/cookieSession")(app);
require("./services/passport")(app);
require("./routes")(app);

app.listen(5000, () => {
  console.log("The server side is listening to port 5000 >>>");
});
