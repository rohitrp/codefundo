const Shelter = require('../model/Shelter')
const addShelterSchema = require('../schemas/addShelter')

module.exports = {
  method: 'POST',
  path: '/api/shelters',
  options: {
    handler: async (request, h) => {
        let shelter = new Shelter(request.payload)

        shelter.user = request.auth.credentials.id

        await shelter.save()

        return shelter
      },
      auth: {
        strategy: 'jwt'
      },
      // validate: {
      //   payload: addShelterSchema
      // },
      description: 'Add shelter',
      notes: 'Adds shelter',
      tags: ['api', 'shelter']
  }
}