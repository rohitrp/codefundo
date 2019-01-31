const ZipcodeStatus = require('../model/ZipcodeStatus')

module.exports = {
  method: 'GET',
  path: '/api/zipcode/status',
  options: {
    handler: async (request, h) => {
      const zipCodeStatus = await ZipcodeStatus.find({})

      return zipCodeStatus;
    },
    description: 'Returns zip code status'
  }
}