const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config();
require("./DB/connection")
const passport = require("passport");
const session = require('express-session');

const errorHandler = require('./middlewares/globalErrorHandler')

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

require('./middlewares/passport');

app.use("/auth", require('./components/auth/auth.controller'));
app.use('/api/user', require('./components/user/user.controller'))
app.use('/api/dashboard', require('./components/dashboard/dashboard.controller'))

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is ruuning on PORT ${process.env.PORT}`)
})