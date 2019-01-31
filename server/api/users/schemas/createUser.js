const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().max(30).required(),
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    mobileNumber: Joi.number().max(12).required(),
    aadharNumber: Joi.number().max(12).required()
})

module.exports = createUserSchema;