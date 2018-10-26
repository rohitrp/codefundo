const Shelter = require('../model/Shelter')
const addShelterSchema = require('../schemas/addShelter')

module.exports = {
  method: 'POST',
  path: '/api/shelters',
  options: {
    handler: async (request, h) => {
        let shelter = new Shelter()

        shelter.name = request.payload.name
        shelter.contact = request.payload.contact
        shelter.address = request.payload.address
        shelter.city = request.payload.city
        shelter.state = request.payload.state
        shelter.user = request.auth.credentials.id
        shelter.lngLat = request.payload.lngLat

        await shelter.save()

        return shelter
      },
      auth: {
        strategy: 'jwt'
      },
      validate: {
        payload: addShelterSchema
      },
      description: 'Add shelter',
      notes: 'Adds shelter',
      tags: ['api', 'shelter']
  }
}