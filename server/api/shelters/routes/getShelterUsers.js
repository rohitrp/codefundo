const Shelter = require('../model/Shelter')
const User = require('../../users/model/User')
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = {
  method: 'GET',
  path: '/api/shelters/{id}/users',
  options: {
    handler: async (request, h) => {
      const shelter = await User.find({shelter: new ObjectId(request.params.id)}).lean()

      return shelter;
    },
    description: 'Returns requested shelter info'
  }
}