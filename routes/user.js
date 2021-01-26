const routes = require('express').Router();
const crypto = require("crypto");
const database = require("../database/Database");
const userController = require("../controllers/UserController");
const mail = require("../common/Mail");

routes.post("/users",userController.insert);
routes.get("/users",userController.getUsers);
routes.post('/reset-password',async (req,res)=>{
    let db = await database.connect('users');
    let user = await db.collection('users').findOne({email: req.body.email})
    if(user){
        let tokenBuffered = await crypto.randomBytes(12)
        let token = tokenBuffered.toString("hex")
        db.collection("users")
            .updateOne(
                {email: req.body.email},
                {$set:{
                    resetToken:token,
                    resetPasswordExp: Date.now() + 36000
                }
              }
            )
        let text = `
              To reset your password: ${token}
        `
        mail.sendMail(req.body.email,'Password reset',text);
        return res.json("Email to reset password was sent");
    }

    return res.json("Email not found");

})

routes.put("/reset-password",async (req,res)=>{
    let db = await database.connect('users');
    let user = await db.collection('users').findOne({resetToken: req.body.token})
    
    if(user && user.resetPasswordExp > Date.now()){
        db.collection('users')
            .updateOne(
                {email:req.body.email},
                {$set:{
                    password:req.body.newPassword,
                    resetToken: null,
                    resetPasswordExp: null
                }
              }
            )
        return res.json("Password has been updated")
    }

    return res.json("Token has expired or it is wrong")
})

module.exports = routes;