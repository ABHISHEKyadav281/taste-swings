const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtsecret="mynameishackeroflife";

router.post('/register',
    [body('email', 'email does not exist').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);
        let secpass=await bcrypt.hash( req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password:secpass,
                location: req.body.location,

            })
            res.json({ success: true });

        } catch (error) {
            console.log(err);
            res.json({ success: false });
        }
    })



router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user == null) {
            res.json({ success: false , prob:"invalid credentials"});
        }
        else{
            const pwdcomp= bcrypt.compare(req.body.password , user.password);
            if (!pwdcomp) {
                res.json({ success: false , prob:"invalid credentials"});
            }
            else {
                const data={
                    person:{
                        id:user.id
                    }
                }
                const authToken=jwt.sign(data,jwtsecret);
                res.json({ success: true ,"authToken":authToken});
            }
        }
    } catch (error) {
        console.log(err);
        res.json({ success: false });
    }
})
module.exports = router;