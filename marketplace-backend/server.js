const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectiondb = require("./mongoose/mongoose")
const port = process.env.PORT || 5000

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require(
    "./routes/listingRoutes"
);
const path = require("path");
const uploadRoutes = require(
    "./routes/uploadRoutes"
);
const app = express();

app.use(cors());
app.use(express.json());
connectiondb()

app.use("/api/auth", authRoutes);
app.use("/api", listingRoutes);
app.use("/api", uploadRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log("server started at ", port)
}) 