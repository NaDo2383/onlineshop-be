const port = 8000;
const express = require("express");
const cors = require("cors");
const app = express();

const menuRouter = require("./routes/menu.route.js");
const catRouter = require("./routes/category.route.js");

app.use(cors());
app.use(express.json());

app.use("/api", menuRouter);

app.get("/api", (req, res) => {
    res.json({ message: "welcome Rest API" });
});

app.listen(port, () => console.log("server is running " + port));
