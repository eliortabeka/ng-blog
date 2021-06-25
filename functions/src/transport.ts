const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhypebsc@gmail.com',
    pass: 'owlbiilfeiggnxym'
  }
});
