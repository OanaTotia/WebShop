const express = require('express');
const app = express();
const sqlInstance = require('mssql/msnodesqlv8');
const url = require('url');

const port = 3040;

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// configuration for database
var configDB = {
    driver: "msnodesqlv8",
    server: 'localhost',
    database: 'Product',
    options: {
        trustedConnection: true,
        useUTC: true
      }
};


app.post("/login", (req, res) => {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;
  console.log('UserName: ', enteredUsername);
  console.log('Password: ', enteredPassword);
  if (enteredUsername && enteredPassword) {
      var pool = new sqlInstance.ConnectionPool(configDB);
      pool.connect().then(function(){ 
          // create PreparedStatement object
          const ps = new sqlInstance.PreparedStatement(pool)
          ps.input('username', sqlInstance.VarChar(25));
          ps.input('password', sqlInstance.VarChar(25));
          ps.prepare("SELECT CustomerID FROM Customer WHERE Email=@username AND [Password] =@password", err => {
              // ... error checks
              if(err) console.log(err);
              ps.execute({username: enteredUsername,password: enteredPassword}, (err, result) => {
                  // ... error checks
                  if(err) console.log(err);
                  console.log('A USER ID WAS RETURNED: ', result);
                  if (result.recordset[0]==undefined){
                      console.log('NO USER ID WAS RETURNED!');
                      res.json({"response": "username or password is INCORRECT"});
                  }else{
                      const nUserId = result.recordset[0].nUserId;
                      console.log(nUserId);
                      if (nUserId > 0) {
                          console.log('A USER ID WAS RETURNED: ', nUserId);
                          res.status(200).json({
                              response: "Logged In",
                              userid: nUserId
                          });
                      } else {
                          console.log('NO USER ID WAS RETURNED!');
                          res.json({"response": "username or password is INCORRECT"});
                      }
                  }
                  // release the connection after queries are executed
                  ps.unprepare(err => {
                      // ... error checks
                      if(err) console.log(err);
                  })
                  })
          })
      }).catch(function (err) {
          console.log(err);
      });      
  } else {
      res.json({"response": "username or password is INCORRECT"});
  }
});



// This endpoint fetches all products from the database, ordering them by price ascending
app.get('/products', function (req, res) {
  sqlInstance.connect(configDB, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sqlInstance.Request();
      // query to the database and get the products
      request.query('SELECT * FROM [Product].[dbo].[v_Product]', function (err, products) {
          if (err) console.log(err);
          // send records as a response
          // console.log(products);
          res.status(200).json({
              products: products
          });
      }); 
  });
});

app.listen(process.env.PORT || port, () => console.log('Listening on port '+ port))
