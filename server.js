const express = require("express");
const parser = require("body-parser");
const cors = require("cors");
const api = require("./routers/api")

const app = express();

app.use(parser.json());
app.use(cors());

app.use("/api/", api)

app.get("/", (req, res) => {

    res.status(200).send("Hello word")

})

app.listen(7070, () => {
    console.log("Server is running on port 7070")
})