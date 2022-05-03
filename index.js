const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
require('dotenv').config();
const nodemailer = require("nodemailer");


// variables
const app=express();
const port=process.env.PORT || 8000;
const {DB_USER,DB_PASS}=process.env;
const dbURI=`mongodb+srv://${DB_USER}:${DB_PASS}@umesh.hybg3.mongodb.net/mern1pmecomapp?retryWrites=true&w=majority`;


// middlewares
app.use(express.json());
app.use(cors())
app.use('/images', express.static('assets/images'))
app.use('/', express.static('public'));

// db connection
mongoose.connect(dbURI,(err)=>{
    if(err) return console.log(err)
    console.log('db is connected')
})

app.use('/api/admin/user',require('./routes/user.routes'));


app.use('/api/admin/category',require('./routes/category.routes'));
app.use('/api/admin/product',require('./routes/product.routes'));

app.use('/api/front',require('./routes/front.routes'));


// routes end



















// server
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
});



async function main(to) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "arvind@csrit.net", // generated ethereal user
        pass: "Arvind@123", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'arvind@csrit.net', // sender address
      to, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  

