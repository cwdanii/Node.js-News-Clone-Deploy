const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodmailer = require('nodemailer');

const app = express()
const port = 5000

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './src/views/index.html'));
  });

app.use(express.json())

// app.get('/', (req, res) => {
//   res.sendFile(__dirname +'/index.html')
// })

app.post('/', (req,res) => {
    console.log(req.body)

    const transporter = nodmailer.createTransport({
        service: "gmail",
        auth: {
            user:'dk301442@gmail.com',
            pass: "ralowgbcijqqvlmz"
        }
    })

    const mailoption = {
        from: req.body.email,
        to: 'dk301442@gmail.com',
        subject: `message from ${req.body.email}: ${req.body.name}`,
        text: req.body.message
    }

    transporter.sendMail(mailoption, (error, info)=>{
        if(error){
            console.log(error)
            res.send('error')
        }
        else{
            console.log("Email sent")
            res.send('success')
        }
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const newsRouter = require('./src/routes/news')

app.use('/news', newsRouter)
app.use('/article', newsRouter)

// Listen on port 5000
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`))