const Shelter = require('../model/Shelter')
const User = require('../../users/model/User')
const addShelterSchema = require('../schemas/addShelter')

module.exports = {
  method: 'POST',
  path: '/api/shelters/join',
  options: {
    handler: async (request, h) => {
        const shelter = await Shelter.findOne({
          _id: request.payload.shelter
        })

        const user = await User.findOneAndUpdate({
          _id: request.auth.credentials.id
        }, {
          shelter: shelter
        }, {
          new: true
        })

        return user
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Join shelter',
      notes: 'Join shelter',
      tags: ['api', 'shelter']
  }
}