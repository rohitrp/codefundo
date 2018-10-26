const User = require('../model/User')

module.exports = {
  method: 'GET',
  path: '/api/users/request',
  options: {
    handler: async (request, h) => {
        const user = await User.findOne({
          _id: request.auth.credentials.id
        }).lean()

        return { lngLat: user.shelterRequestLngLat }
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Returns coordinates for shelter request'
  }
}