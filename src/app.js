// Core Modules
const path = require("path");

// Npm Modules
const express = require("express");
const hbs = require("hbs");
const app = express();

// My Modules
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); //use this when you need to change your views path
hbs.registerPartials(partialsPath);

// Setup stactic directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Olomukoro Alexander"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No address provided"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location
      });
    });
    
  });
  /*res.send({
    address: req.query.address
  }); */
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Olomukoro Alexander"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is the help message. Hope it helps",
    name: "Olomukoro Alexander"
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help article not found",
    title: "Article not found",
    name: "Olomukoro Alexander"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    message: "error 404: page not found",
    title: "Error",
    name: "Olomukoro Alexander"
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
