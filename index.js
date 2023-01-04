const express = require('express')
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const connectRedis = require('connect-redis')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const { createClient } = require('redis')
const passport = require('passport')
const { passportConfig } = require('./utils/passport')
const routes = require('./routes')
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000

const redisClient = createClient({ legacyMode: true })
redisClient.connect().catch(console.error)
const RedisStore = connectRedis(session)

//Configure session middleware
const SESSION_SECRET = process.env.SESSION_SECRET

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in milliseconds
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json()) //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })) //Parse URL-encoded bodies
app.use(morgan('combined'))
passportConfig()
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
