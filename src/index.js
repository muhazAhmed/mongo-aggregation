const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const router = require("./route");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 8800;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
