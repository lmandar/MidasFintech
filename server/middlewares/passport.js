const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../components/user/user.model');


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ email: profile.emails[0].value })
            if (existingUser) {
                existingUser.token = accessToken;
                return done(null, existingUser);
            }

            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                token: accessToken,
                photo: profile.photos[0].value
            });

            await newUser.save()
            return done(null, newUser);

        } catch (err) {
            console.log("err", err)
            return done(err);
        }

    }));


passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/linkedin/callback",
        scope: ['r_emailaddress'],
        state: true
      },
      async function(accessToken, refreshToken, profile, done) {
        // In a real application, you would save the user to the database here.
        console.log("profile",profile)
        return done(null, profile);
      }
    ));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
        console.log("err",err)
      done(err, null);
    }
  });