var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',//smtp.gmail.com  //in place of service use host...
  secure: false,//true
  port: 465,//465
  auth: {
    user: '681ef84010fe09',
    pass: 'e78bf73fc496cd'
  }, tls: {
    rejectUnauthorized: false
  }
});

transporter.sendEMail = function (mailRequest) {
  return new Promise(function (resolve, reject) {
    transporter.sendMail(mailRequest, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve("The message was sent!");
      }
    });
  });
}

module.exports = transporter;