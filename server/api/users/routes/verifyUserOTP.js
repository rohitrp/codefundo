var rp = require('request-promise');
const User = require('../model/User')
const authyBaseUrl = process.env.TWILIO_API_URL  
const API_KEY = process.env.TWILIO_API_KEY

module.exports = {
  method: 'GET',
  path: '/api/users/otp',
  options: {
    handler: async (request, h) => {
        const user = await User.findOne({_id: request.auth.credentials.id})
        const options = {
            method:'GET',
            url: `${authyBaseUrl}/check`,
            form:{
                api_key: API_KEY,
                phone_number : user.mobileNumber,
                via: 'sms',
                country_code:91,
                verification_code: request.query.otp
            }
            
        }
        // console.log(options)
        let res = await rp(options)
        console.log(res)
        await User.updateOne({ _id: user._id }, { verifiedMobile: true })

        return res
      },
      auth: {
        strategy: 'jwt'
      },
      // validate: {
      //   payload: addShelterSchema
      // },
      description: 'Add shelter',
      notes: 'Adds shelter',
      tags: ['api', 'shelter']
  }
}


// PhoneVerification.prototype.verifyPhoneToken = function (phone_number, country_code, token, callback) {

//     console.log('in verify phone');
//     this._request("get", "/protected/json/phones/verification/check", {
//             "api_key": this.apiKey,
//             "verification_code": token,
//             "phone_number": phone_number,
//             "country_code": country_code
//         },
//         callback
//     );
// };