const cors = require("cors");
const express = require("express");
const mainRoute = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRoute)

app.listen(3000);