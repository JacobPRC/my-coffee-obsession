const express = require("express");
const dotenv = require("dotenv");

const connectdb = require("./config/db");
const cafes = require("./routes/cafes");
const users = require("./routes/users");
const auth = require("./routes/auth");
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

connectdb();

const app = express();

app.use(express.json());

app.use("/cafes", cafes);
app.use("/profile", users);
app.use("/user", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
