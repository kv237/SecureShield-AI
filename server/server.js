const express = require("express");
const cors = require("cors");

const scanRoutes = require("./routes/scanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/scan", scanRoutes);

app.get("/", (req, res) => {
  res.send("SecureCode AI Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});