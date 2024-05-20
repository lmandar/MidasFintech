const passport = require("passport");
const express = require('express');
const router = express.Router()
const {genrateToken} = require('../../common-function/common-function')

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get('/linkedin', passport.authenticate('linkedin', { scope: ["profile", "email"], state: false }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    async (req, res) => {
        const payload =  { email: req.user.email, name: req.user.name };
        let token = await genrateToken(payload)
        res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    }
);
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3000/login' }),
    async (req, res) => {
        const payload = { email: req.user.email, name: req.user.name };
        let token = await genrateToken(payload)
        res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    });


module.exports = router