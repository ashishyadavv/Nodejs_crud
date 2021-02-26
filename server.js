const express = require('express')
const app=express()
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyparser = require('body-parser');
// const cors= require('cors')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const route = require('./routes/index')
const mongoose= require('mongoose')

// app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(bodyparser.urlencoded({ extended: true }));

//used templating language to render my pages
app.set('views', path.join(__dirname, '/views/'));


app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts' }));

app.set('view engine','hbs')

//REstful paths are defined in the routes
app.use('/',route)

//connectin mongoDb using mongoose
mongoose.connect('mongodb://localhost:27017/ratings')
const db=mongoose.connection
db.on('error',err=>{
    console.error(err)
})

app.listen(4444,()=>{
    console.log('server started at http://localhost:4444')
})















