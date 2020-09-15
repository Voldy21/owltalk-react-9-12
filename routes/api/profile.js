const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const request = require('request');
const config = require('config');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post')

// @route    GET api/Profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile
                        .findOne({user : req.user.id})
                        .populate(
                            'user' //name of model
                            );
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error');
    }
});

// @route    POST api/Profile
// @desc     Create or update user profile
// @access   Private

router.post('/', auth, async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }

        const {
            name,
            hobbies,
            location,
            major
        } = req.body;

        //Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(name) profileFields.name = name;
        if(location) profileFields.location = location;
        if(major) profileFields.major = major;
        if(hobbies) {
            profileFields.hobbies = hobbies.split(',').map(skill => skill.trim());
        }
        try{
            let profile = await Profile.findOne( {user: req.user.id} );
            
            if(profile){
                //Update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                );
                profile = profile.populate("user")

                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        }catch(err){
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// @route    GET api/Profile
// @desc     Get all profiles
// @access   Public

router.get("/", async (req, res) => {
    try {
        const profiles = await Profile
                        .find()
                        .populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

// @route    GET api/Profile/user/:user_id
// @desc     Get profile by user_id
// @access   Public

router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile
            .findOne( {user: req.params.user_id} )
            .populate('user');
        if(!profile) return res.status(400).json({msg: 'Profile not found'});
        
        const posts = await Post.find({user : req.params.user_id})
        res.json({profile, posts});
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'});
        }
        res.status(500).send("Server Error");
    }
})


// @route    Delete api/profile
// @desc     Delete profile, user, & posts
// @access   Private

router.delete("/", auth ,async (req, res) => {
    try {
        //@todo - remove users posts
        //Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove user
        await User.findOneAndRemove({_id: req.user.id});
        

        res.json({msg: "User deleted"});
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
})

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private

router.put(
    '/experience',
    [
        check('title', 'Title is required')
            .not()
            .isEmpty(),
        check('company', 'Company is required')
            .not()
            .isEmpty(),
        check('from', 'From date is required')
            .not()
            .isEmpty(),
    ], 
    auth, 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
          } = req.body;

          const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
          };

        try {
            const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name']);
            
            profile.experience.unshift(newExp);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }

})

// @route    Delete api/profile/experience/:_id
// @desc     Delete experience
// @access   Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        //Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message)
        res.status(404).send("Experience could not be found")
        
    }
})

module.exports = router;