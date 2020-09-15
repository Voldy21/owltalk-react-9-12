const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const normalize = require("normalize-url")
const auth = require("../../middleware/auth")

//Bring in the User schema
const User = require("../../models/User");

// @route    POST api/users
// @desc     Create a new user
// @access   Public
router.get('/', auth, (req,res) => {
    res.status(200).json({id: req.user.id})
})

// @route    POST api/users
// @desc     Create a new user
// @access   Public
router.post(
    '/', 
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 6}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        //pull name, email, and password from req.body
        const { name, email, password } = req.body;
        
        try{
        //See if user exists
        
        let user = await User.findOne({ email: email });

        if(user){
           return res.status(400).json({ errors: [{ msg: "User already exists"}] });
        }

        const avatar = normalize(
            gravatar.url(email, {
              s: '200',
              r: 'pg',
              d: 'mm'
            }),
            { forceHttps: true }
          );

        user = new User({
            name, 
            email,
            avatar,
            password
        });

        //Encrypt the password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        
        await user.save();


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