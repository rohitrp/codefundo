const User = require('../model/User')

module.exports = {
  method: 'GET',
  path: '/api/users/request/all',
  options: {
    handler: async (request, h) => {
        const users = await User.find({}).select('shelterRequestLngLat').lean()

        return users
      },
      description: 'Returns coordinates for shelter request'
  }
}