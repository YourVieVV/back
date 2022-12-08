const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose');
const secretKey = require('dotenv').config().parsed.jwt;

const User = mongoose.model('users');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
                const user = await User.findById(payload.userId).select('login id')
                if (user) {
                    done(null, user);
                } else {
                    done (null, false);
                }
            }
            catch (e){
                console.log('==========>e = ' , e)
            }

        })
    )
}