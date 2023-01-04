const LocalStrategy = require('passport-local/lib').Strategy
const passport = require('passport')
const { Users } = require('../models')
const bcrypt = require('bcrypt')

module.exports.passportConfig = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        const user = await Users.findOne({ where: { email: email } })

        if (!user) {
          return done(null, false, { message: 'Invalid credentials.\n' })
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Invalid credentials.\n' })
        }
        return done(null, user)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await Users.findByPk(id)
    if (!user) {
      // eslint-disable-next-line no-undef
      done(error, false)
    }
    done(null, user)
  })
}
