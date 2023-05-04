const express = require('express');
const cors = require('cors');

const postRouter = require('./routers/post');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "BJD",
        description: "Deepest darkest secrets."
    })
})

app.use("/posts", postRouter);

module.exports = app;
