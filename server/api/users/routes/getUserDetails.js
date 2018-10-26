const User = require('../../users/model/User')

module.exports = {
  method: 'Get',
  path: '/api/users/details',
  options: {
    handler: async (request, h) => {
        const user = await User.findOne({
          _id: request.auth.credentials.id
        }).select('-password')

        return user
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Returns user details',
      notes: 'Returns user details',
      tags: ['api', 'users']
  }
}