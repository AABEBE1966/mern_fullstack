
const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    content: { type: String, required: true },
    likes: {
        type: [
            {
                actorId: {
                    type: mongoose.Schema.ObjectId, ref: "Users"
                },
                likeType: {
                    type: String, default: "like"
                }
            }
        ], default: undefined
    },
    comments: {
        type: [
            {
                actorId: {
                    type: mongoose.Schema.ObjectId, ref: "Users"
                },
                comment: {
                    type: String, default: " "
                }
            }
        ], default: undefined
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.ObjectId, ref: "Users" }
})

module.exports = mongoose.model("Posts", PostSchema)

// comment section/card
// user name
// profile pic
// commennt 
// bio

/**
 * Accounts
 * Abebe, Alemitu, Chebude
 * Alemitu id: 61b4c60bbb64db7d51f726a6
 * Abebe Id: 61b4c591bb64db7d51f726a0
 * Chebude Id: 61b4c5e7bb64db7d51f726a3
 * Alemitu will make a post:postId: 61b4c6d31f8fb71764036d40
 * -> Chebude will comment -> chebudeId, postId, comment (contentn)
 * -> Abebe will comment -> abebeId, postId, comment
 * -> Chebude will give her a love ->  chebudeId, postId, love
 * -> Abebe will give her a like -> abebeId, postId, like
 *
 */