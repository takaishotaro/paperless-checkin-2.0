const sgMail = require('@sendgrid/mail')
const fs = require('fs')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = () => {
    sgMail.send({
        to: "takaishotaro326@gmail.com",
        from: 'takaishotaro326@gmail.com',
        subject: 'Thanks for join!!',
        text: `Welcome to the app, `,
    })
}

const sendSignImage = (name,email) => {
  const attachment = fs.readFileSync("image.png").toString("base64");
  sgMail.send({
    to: email,
    from: email,
    subject: `【コロナ同意書】ゲスト名：${name}`,
    text:"sign",
    attachments: [
      {
        content: attachment,
        filename: "attachment.png",
        type: "application/png",
        disposition: "attachment"
      }
    ]
  })
}
module.exports = {
    sendWelcomeEmail,
    sendSignImage
}