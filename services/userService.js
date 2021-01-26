const bcrypt = require("bcrypt");
const database = require("../database/Database");
const mail = require("../common/Mail");

class UserService{
    async register(user){
        let db = await database.connect("users");
        user.password = await bcrypt.hash(user.password,12)
        mail.sendMail(user.email,"Welcome","Welcome to my application");
        return await db.collection("users").insertOne(user);
    }

    async getUsers(){
        let db = await database.connect("users");
        return await db.collection("users").find().toArray();
    }
}

module.exports = new UserService();