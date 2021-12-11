
let express = require('express')
let bodyParser = require('body-parser');
let mongoose = require("mongoose")
const dotenv = require("dotenv");
const cors = require('cors')

let app = express();

dotenv.config({
    path: "./config.env",
});

let port = process.env.PORT || 5000


let apiRoutes = require("./routes")

// app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())
app.use("/api", apiRoutes)


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(`DB is not connected. Error message ${err}`)
    } else {
        console.log("successfully connected to db")
    }
})

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});


// mongodb+srv://MERN_fullstack:pass@cluster0.35cyz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
/*
MVC --> model, view, controller
- create database -->
- define database schema
- we create accounts
- we post contents
- we interact with posts --> like or comment
*/