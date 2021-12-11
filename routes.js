const express = require("express")
const Post = require("./model/Post")
const User = require("./model/User")

const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome EthioBook."
    })
})

router.post("/signUp", async (req, res) => {
    let { email, name, bio, password } = req.body
    console.log(req.body)
    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        res.status(201).json({
            message: `A profile with email: ${email} exist. Please use another email`
        })
        return
    }

    const user = new User({
        name: name,
        email: email,
        password: password,
        bio: bio
    })
    try {
        await user.save()
        res.status(200).json({
            message: "Account is created successfully.",
            user: user
        })

    } catch (err) {
        res.status(201).json({
            message: "Something is wrong. Please retry"
        })
    }

})


// change the query parameter from email to an id
router.get("/getUser/:email", async (req, res) => {
    const email = req.params.email
    let user = await User.findOne({
        email: email
    }, {
        "password": 0
    }).populate({
        path: "posts", populate: [
            {
                path: "comments", populate: [
                    {
                        path: "actorId", select: {
                            name: 1, bio: 1, profilePic: 1, email: 1
                        }
                    }
                ]
            }, {
                path: "likes", populate: [
                    {
                        path: "actorId", select: {
                            name: 1, bio: 1, profilePic: 1, email: 1
                        }
                    }
                ]
            }
        ]
    })

    if (!user) {
        res.status(201).json({
            message: `Accound with ${email} does not exist`
        })
        return
    }
    res.status(200).send(user)

})

router.post("/createPost", async (req, res) => {
    let { email, password, content } = req.body

    let user = await User.findOne({
        email: email
    })

    if (!user) {
        res.status(201).json({
            message: `Accound with ${email} does not exist`
        })
        return
    } else if (user.password !== password) {
        console.log(user.password)
        res.status(201).json({
            message: " Wrong password provided. Please retry."
        })
        return
    }

    let prevPosts = user.posts
    const newPost = new Post({
        content: content,
        user: user._id
    })

    try {
        prevPosts.push(newPost._id)
        await newPost.save()
        user.posts = prevPosts
        await user.save()
        res.status(200).json({
            message: "post is added",
        })
    } catch (err) {
        console.log(err)
        res.status(201).json({
            message: `Something is wrong. Please retry again`
        })
        return
    }
})

router.post("/commentToAPost", async (req, res) => {
    const { comment, actorId, postId } = req.body;
    try {
        let post = await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    actorId: actorId, comment: comment
                }
            }
        })
        return res.status(200).json({
            message: "Comment is added successfully!"
        })
    } catch (err) {
        return res.status(201).json({
            message: "Something is wrong. We could not add your comment. Try leave us alone!"
        })
    }
})


router.post("/likeAPost", async (req, res) => {
    const { likeType, actorId, postId } = req.body;
    try {
        let post = await Post.findByIdAndUpdate(postId, {
            $push: {
                likes: {
                    actorId: actorId, likeType: likeType
                }
            }
        })
        return res.status(200).json({
            message: "Post is successfully liked!"
        })
    } catch (err) {
        return res.status(201).json({
            message: "Somethign is wrong. plz try it later.!"
        })
    }
})

/**
 * 
 * CRUD: create, read, update and delete API 
 * 
 */


module.exports = router
