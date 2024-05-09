const mysql = require('mysql2'); 
const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jobs',
  
});


connection.connect((error)=>{
    if(error){
        console.log("error while connecting",error);
        return;
    }
    // console.log(`connected succesfuly to database ${connection.config.database}`);
    
})



 module.exports = connection;