const mongo = require("mongodb").MongoClient;

class Database{
    async connect(database){
       try{
        let conn = await mongo.connect("mongodb://mongo:27017",{
            useUnifiedTopology: true
        });
        console.log(conn);
        return conn.db(database);
       }catch(e){
           console.log(e)
       }

    }
}


module.exports = new Database();