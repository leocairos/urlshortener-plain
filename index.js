const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const urls = require("./urls.json");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

// get all saved URLs
app.get("/all", async (req, res, next) => {
  console.log('Getting all urls...');
  res.json(urls);
});

// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url = urls.find(item => item.urlId === req.params.urlId);
    if (url) {
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});