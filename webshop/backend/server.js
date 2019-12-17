var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/gamesModel'),
  bodyParser = require('body-parser');

var cors = require('cors')  
app.use(cors())
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Gamesdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/gamesRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
