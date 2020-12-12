import User from '../models/userModel.js';
import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET
}

const passportMiddle = (passport) => {
    passport.use(new Strategy(opts, async (payload, done) => {
        await User.findById(payload.user_id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(((err) => {
                return done(null, false);
            }))
    }));
}

/**
 * @DESC Passport Middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Roles
 */
const checkRole = (roles) => (req, res, next) => {
    !roles.includes(req.user.role) ? res.status(401).json("Unauthorized") : next();
};

export { passportMiddle, userAuth, checkRole };