const Joi = require('joi')

const addShelterSchema = Joi.object().keys({
  name: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  lngLat: Joi.string().required(),
  zipcode: Joi.string().required()
})

module.exports = addShelterSchema