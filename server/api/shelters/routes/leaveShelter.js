const User = require('../../users/model/User')

module.exports = {
  method: 'POST',
  path: '/api/shelters/leave',
  options: {
    handler: async (request, h) => {
        const user = await User.findOneAndUpdate({
          _id: request.auth.credentials.id
        }, {
          shelter: null
        }, {
          new: true
        })

        return user
      },
      auth: {
        strategy: 'jwt'
      },
      description: 'Leave shelter',
      notes: 'Leave shelter',
      tags: ['api', 'shelter']
  }
}