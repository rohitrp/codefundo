const User = require('../model/User')

module.exports = {
  method: 'POST',
  path: '/api/users/request',
  options: {
    handler: async (request, h) => {
        const user = await User.findOneAndUpdate({
          _id: request.auth.credentials.id
        }, {
          shelterRequestLngLat: request.payload.lngLat
        }, {
          new: true
        })

        return user
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Request shelter'
  }
}