const RestfulAPI = require('./RestClass');
const db = require('../models');

module.exports = function (app) {
  
  const kudos = new RestfulAPI('kudos', app, models.Kudos);
  kudos.findAll();
  kudos.find('id');
  kudos.create();
  kudos.delete('id');
  kudos.update('id');

  const users = new RestfulAPI('users', app, models.Users);
  users.findAll();
  users.find('id');
  users.create();
  users.delete('id');
  users.update('id');

};