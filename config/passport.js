import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/User.js';

const JWT_SECRET = 'superSecretKey123';

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
    token = req.cookies.jwt;
}
    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: JWT_SECRET,
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await UserModel.findById(jwt_payload.id);
        if (user) {
        return done(null, user);
        } else {
        return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
})
);

export default passport;

