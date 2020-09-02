const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const quest = require("./routes/quest");
const skill = require("./routes/skill");
const app = express();
const cors = require("cors");

mongoose
  .connect("mongodb://localhost/irl")
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(err));

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey not in envs.");
  process.exit(1);
}

corsOptions = {
  origin: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token", "Accept"],
  credentials: true,
  exposedHeaders: ["x-auth-token"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/user", users);
app.use("/api/auth", auth);
app.use("/api/quest", quest);
app.use("/api/skill", skill);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
