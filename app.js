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

app.post("/api/geocoding", async (req, res) => {
  try {
    let geo = [];

    for (let i = 0; i < req.body.destinations.length; i++) {
      let response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.destinations[i]}&key=AIzaSyAMGJ-1QIKCEJ99HPGuVxJdBK146vE0M-M`
      );
      geo.push({
        name: req.body.destinations[i],
        location: response.data.results[0].geometry.location,
      });
    }

    res.status(200).send({ data: geo });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/destinations", async (req, res) => {
  try {
    let results = [];

    for (let i = 0; i < req.body.destinations.length; i++) {
      let response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${req.body.destinations[i].location.lat}&lon=${req.body.destinations[i].location.lng}&appid=7ed43b13cc6dabfebe659dca2125f447`
      );
      results.push({
        name: req.body.destinations[i].name,
        data: response.data,
      });
    }

    res.status(200).json({ data: results, message: "success" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
