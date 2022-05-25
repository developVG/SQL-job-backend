const sql = require('mssql');
require('dotenv').config();



const pool_server_business = new sql.ConnectionPool(JSON.parse(`${process.env.DB_CONFIG}`))
    .connect()
    .then(pool => {
        return pool;
    })
    .catch(err => {
        console.log(`Impossibile connettersi a srv-business, ${err}`);
    })
    

module.exports = {
    sql, pool_server_business
}



