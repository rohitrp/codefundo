const authenticateUserSchema = require('../schemas/authenticateUser')
const verifyCredentials = require('../util/userFunctions').verifyCredentials
const getUserDetails = require('../util/userFunctions').getUserDetails
const User = require('../model/User')

module.exports = {
    method: 'POST',
    path: '/api/token/refresh',
    options: {
        handler: async (request, h) => {
          const user = await User.findOne({ _id: request.auth.credentials.id })
            return getUserDetails(user)
        },
        auth: {
          strategy: 'jwt'
        },
        description: 'Refresh token',
        notes: 'Returns a token on correct user credentials',
        tags: ['api', 'user']
    }
}