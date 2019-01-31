const Boom = require('boom')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const createToken = require('../util/token')
const request = require('request-promise')

async function verifyUniqueUser(request, h) {    
    const user = await User.findOne({
        email: request.payload.email
    })

    if (user) {
        return Boom.badRequest('User exists!')
    }

    return user
}

async function verifyCredentials(request) {
    const user = await User.findOne({
        email: request.payload.email
    }).select('-__v').lean()

    if (user) {
        const isValid = await bcrypt.compare(request.payload.password, user.password)

        if (isValid) {
            return user
        } else {
            return Boom.badRequest('Incorrect password!')
        }
    } else {
        return Boom.badRequest('User does not exist!')
    }
}

async function getUserDetails(user) {
    return {
        user: {
            email: user.email,
            verifiedMobile: user.verifiedMobile,
            token: createToken(user)
        }
    }
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials,
    getUserDetails: getUserDetails
}