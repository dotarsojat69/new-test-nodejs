require('dotenv').config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server ready on port ${port}`);
});