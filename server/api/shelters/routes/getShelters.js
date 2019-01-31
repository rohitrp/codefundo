const Shelter = require('../model/Shelter')
const User = require('../../users/model/User')

function distance(lat1, lon1, shelter) {
  const unit = 'K';
  const lon2 = +shelter.lngLat.split(",")[0];
  const lat2 = +shelter.lngLat.split(",")[1];

  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") { dist = dist * 1.609344 }
    return dist.toFixed(2);
  }
}

module.exports = {
  method: 'GET',
  path: '/api/shelters',
  options: {
    handler: async (request, h) => {
      const userLat = +request.query.lat
      const userLng = +request.query.lng

      const shelters = await Shelter.find({}).lean()

      for (let i = 0; i < shelters.length; i++) {
        const user = await User.findOne({ _id: shelters[i].user })
        shelters[i].user = user.email;
      }

      const nearbyShelters = []

      for (let i = 0; i < shelters.length; i++) {
        const dist = distance(userLat, userLng, shelters[i]);
        if ( dist < 50) {
          shelters[i]['distance'] = dist
          nearbyShelters.push(shelters[i])
        }
      }

      return nearbyShelters;
    },
    description: 'Returns all shelters'
  }
}