if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const mongoUrl =
  "mongodb://localhost:27017/brain-pocket" || process.env.MONGODB_ATLAS;
const port = process.env.PORT || 5000;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB >>>");
  })
  .catch(() => {
    console.log("Unable to connect to MongoDB");
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

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let clientError = err.message;
  let clientStatus = err.status || 500;

  if (err.name === "CastError") {
    clientError =
      "Error in the search request, please change the request then try again.";
    clientStatus = 400;
  } else if (err.name === "TypeError") {
    clientError = "You are not authorized to make this request.";
    clientStatus = 403;
  } else if (err.name === "ValidationError") {
    clientStatus = 400;
  } else if (err.name === "MongooseError") {
    clientError = "Something went wrong, please try again after a while.";
    clientStatus = 502;
  }

  res.status(clientStatus).json(clientError);
});

app.listen(port, () => {
  console.log(`The server side is listening to port ${port} >>>`);
});
