const crypto = require("crypto");

let generateToken = async () =>{
    let buffer = await crypto.randomBytes(32);
    return buffer.toString('hex');
}


console.log(generateToken().then(result =>{
    console.log(result)
}));