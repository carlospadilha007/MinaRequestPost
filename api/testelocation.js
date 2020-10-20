const { insideCircle } = require('geolocation-utils');

const center = {lat: 51, lon: 4}
const radius = 10000 // meters
 
const latitude = -51.038855
const longitude = -51.038855

insideCircle({lat: latitude, lon: longitude}, center, radius) // true
insideCircle({lat: 51.3, lon: 4.5}, center, radius)   // false

console.log(insideCircle({lat: latitude, lon: longitude}, center, radius) )
console.log(insideCircle({lat: 51.3, lon: 4.5}, center, radius))