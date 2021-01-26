const userService = require("../services/userService");

class UserService{
    async insert(req,res){
        let result = await userService.register({name:req.body.name,email:req.body.email,password:req.body.password})
        res.json(result);
    }

    async getUsers(req,res){
        let users = await userService.getUsers();
        return res.json(users);
    }
}

module.exports = new UserService();