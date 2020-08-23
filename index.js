const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const quest = require("./routes/quest");
const app = express();

mongoose
  .connect("mongodb://localhost/irl")
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(err));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey not in envs.");
  process.exit(1);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Routes
app.use("/api/user", users);
app.use("/api/auth", auth);
app.use("/api/quest", quest);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
