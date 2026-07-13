const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const apiModule = require("./apis/api.js");
const { router: dbRouter } = require("./db.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());


// Serve static files
app.use(express.static(path.join(__dirname, "public")));


// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});


app.use("/db", dbRouter);
app.use("/api", apiModule);


const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});