require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const {dbConnect}= require('./config/database')
const gameRoutes=require('./routes/game.routes')
const leagueRoutes=require('./routes/league.routes')
const userRoutes=require('./routes/user.routes.js')
const CookieParser=require('cookie-parser')
const cors=require('cors')


// create express app
const app = express();

//connect database
dbConnect(app);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(CookieParser())
app.use(cors())

app.set('view engine', 'ejs')


app.get('/about',(req,res)=>{
res.render('about', { title: 'About'});
});

app.get('/',(req,res)=>{
    res.redirect('/leagues');
})

app.use('/leagues', leagueRoutes)

app.use('/leagues', gameRoutes)

app.use('/leagues', userRoutes)


