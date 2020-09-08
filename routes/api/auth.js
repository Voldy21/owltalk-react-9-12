const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");




const User = require('../../models/User');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', 
    auth, 
    async (req, res) => {
        try{
            const user = await User.findById(req.user.id)
            .select('-password');
            res.json(user);
        }catch(err){
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/', 
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required')
        .exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //pull name, email, and password from req.body
        const { email, password } = req.body;
        
        try{
        //See if user exists
        
        let user = await User.findOne({ email: email });

        if(!user){
           return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials"}]});
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, // payload
            config.get('jwtToken'), //secret
            { expiresIn: 36000}, //expiration
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );

        }catch(error){
            console.log(error.message);
            res.status(500).send("Server error");
        }
    }
);


module.exports = router;