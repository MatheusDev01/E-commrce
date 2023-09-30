import { createConnection } from 'mysql2';
 
const DATABASE_URL='mysql://byn5na033qbx7u0tlxj8:pscale_pw_AdI1bSbLsKnLJVclGIQa1VNWmkj5SMjMLxKr2G7O4Lz@aws.connect.psdb.cloud/matheusdb?ssl={"rejectUnauthorized":true}';
const db = createConnection(DATABASE_URL);

function conectar() {db.connect(function (err) {
  console.log('Connected to PlanetScale!');
})};
var array = [];

  var asd = db.query({
  sql: 'SELECT * FROM Cliente', 
  rowsAsArray: true},
  function as (err, results, fields) {
   return results
  }
)
const a = asd.as(results, fields);
console.log(a);


db.end();

