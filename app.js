const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/destinations", async (req, res) => {
  try {
    console.log(req.body.message);
    let response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=Northampton&origins=London&key=${process.env.API_KEY}`
    );

    let destinations = [
      response.data.destination_addresses[0],
      response.data.origin_addresses[0],
    ];

    console.log(destinations);

    res.status(200).json({ data: response, message: "success" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
