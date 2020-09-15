const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require("../../middleware/auth");
const gravatar = require("gravatar")


const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require("../../models/Post");

// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.post(
    '/', 
    [
        auth,
        [
            check('title', "Title is required").not().isEmpty(),
            check('text', "Text is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        } 
        try {
            const user = await User
                .findById(req.user.id)
                .select('-password'); //return everything but the password

            const newPostFields = {
                text: req.body.text,
                title: req.body.title,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            let newPost = new Post(newPostFields);

            await newPost.save();
            
            res.json({newPost});
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });

// @route    GET api/posts
// @desc     Get all posts
// @access   Private because only people with accounts can see posts

router.get("/", async (req, res) => {
    try {
        const posts = await Post
                .find()
                .sort({date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error");
    }
});

// @route    GET api/posts/:id
// @desc     Get all posts
// @access   Private

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});

        if(!post) return res.status(404).json({msg: "Post not found"});

        res.json(post);
    } catch (err) {
        if(err.kind === 'ObjectId'){
           return res.status(404).json({msg: "Post not found"});
        }

        console.error(err.message + " " + err.kind)
        res.status(500).send("Server Error");
    }
});

// @route    DELETE api/posts/:id
// @desc     Delete post
// @access   Private

router.delete('/:post_id', auth, async (req,res) => {
    try {
        let post = await Post.findById(req.params.post_id);

        //Check user: Only the user should be able to delete own posts
        if(!post){
            return res.status(404).json({msg: "Post not found"});
         }
        
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();

        res.json({msg: "Post deleted"});
    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
         }
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route    Update api/posts/:post_id
// @desc     Update post
// @access   Private
router.put(
    "/:post_id", 
    [
        auth,
        [
            check('title', "Title is required").not().isEmpty(),
            check('text', "Text is required").not().isEmpty()
        ]
    ], 
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        } 

    try {
        let post = await Post.findOneAndUpdate(
            {_id: req.params.post_id}, 
            {text: req.body.text}, 
            { new: true }
        );

        if(!post){
            return res.status(404).json({msg: "Post not found"});
        }

        return res.json(post);

    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
         }

        console.error(err.message);
        res.status(500).send("Server Error");
    }

})

// @route    PUT api/posts/like/:post_id
// @desc     Like a post
// @access   Private
router.put('/like/:post_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been liked

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: "Post already liked"});
        }

        post.likes.unshift({user: req.user.id});

        await post.save();

        res.json(post.likes);
    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
         }

        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route    Delete api/posts/like/:post_id
// @desc     Remove a like
// @access   Private
router.delete('/like/:post_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        //Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg: "Post not liked"});
        }

         const removeIndex = post.likes
             .map(like => like.user.toString())
             .indexOf(req.user.id);

        
        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post);
    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Post not found"});
         }

        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route    Post api/posts/comment:id
// @desc     Create a comment
// @access   Private
router.post(
    '/comment/:id', 
    [
        auth,
        [
            check('text', "Text is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        } 
        try {
            const user = await User
                .findById(req.user.id)
                .select('-password'); //return everything but the password
            const post = await Post.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment);
            await post.save();
            
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });

// @route    Delete api/Post/comment/:id/:comment_id
// @desc     Removing a comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //check if comment exists
        if(!comment){
            return res.status(404).json({msg: "Comment not found"})
        }

        //check if the user made the comment
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: "User not authorized"})
        }


        const removeIndex = post.comments
             .map(comment => comment.user.toString())
             .indexOf(req.user.id);
        
        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg: "Comment not found"});
         }

        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/user/:user_id", async (req,res) => {
    try {
        let id = req.params.user_id
        let posts = await Post.find({user: id})
        console.log(posts)
        res.json(posts)
    } catch (error) {
        res.status(404).send("Something fucked up")
    }
})



module.exports = router;