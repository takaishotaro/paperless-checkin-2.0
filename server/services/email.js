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

const sendSignImage = (date,email) => {
  const attachment = fs.readFileSync("image.png").toString("base64");
  sgMail.send({
    to: email,
    from: email,
    subject: `【コロナ同意書】日付：${date}`,
    text:"署名が完了しました。",
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

const sendExampleSignImage = (date,email) => {
  const attachment = fs.readFileSync("image.png").toString("base64");
  sgMail.send({
    from: "takaishotaro326@gmail.com",
    to: email,
    subject: `【コロナ同意書】日付：${date}`,
    text:"署名が完了しました。",
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
    sendSignImage,
    sendExampleSignImage
}