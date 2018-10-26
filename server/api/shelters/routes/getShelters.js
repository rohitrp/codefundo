const Shelter = require('../model/Shelter')
const User = require('../../users/model/User')

module.exports = {
  method: 'GET',
  path: '/api/shelters',
  options: {
    handler: async (request, h) => {
      const shelters = await Shelter.find({}).lean()

      for (let i = 0; i < shelters.length; i++) {
        const user = await User.findOne({ _id: shelters[i].user })
        shelters[i].user = user.email;
      }

      return shelters;
    },
    description: 'Returns all shelters'
  }
}