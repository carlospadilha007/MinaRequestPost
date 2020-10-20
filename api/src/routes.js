const express = require('express');
const routes = express.Router();

const LocationController = require('./controllers/LocationController')
const locationController = new LocationController();


routes.post('/locations', locationController.listLocations)
routes.delete('/locations/:id', locationController.deleteLocation)


module.exports=routes;