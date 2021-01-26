const nodemailer = require('nodemailer');

class Mail{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:"raphaeldiasc16@gmail.com",
                pass:"8625251Ra"
            }
        })
    }

    async sendMail(to,subject,text){
        let info = await this.transporter.sendMail({
            from: 'raphaeldiasc16@gmail.com',
            to:to,
            subject:subject,
            text:text
        })

        return info;
    }
}

module.exports = new Mail();