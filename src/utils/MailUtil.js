const mailer = require('nodemailer')

const sendingMail = async(to,subject,text) => {
    const transporter= mailer.createTransport({
        service:'gmail',
        auth:{
            user:'rajinternship9@gmail.com',
            pass:'spqd wjxc nfce qlxd'
        }
    })

    const mailOptions={
        from:'rajinternship9@gmail.com',
        to:to,
        subject:subject,
        text:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;
}

module.exports={
    sendingMail
}