'use strict';
module.exports = function(app) {
  var games = require('../controllers/gamesController');


  // games Routes
  app.route('/games')
    .get(games.list_all_games)
    .post(games.create_a_game);


  app.route('/games/:gameId')
    .get(games.see_a_game)
    .put(games.update_a_game)
    .delete(games.delete_a_game);
};