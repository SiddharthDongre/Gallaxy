const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const requireLogin = require("../middleware/requireLogin"); 

const router = express.Router();
const User = mongoose.model("User");

router.post("/signup", (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        return res.status(422).send({ error: "please add all the field" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exist with that email" });
            }

            bcrypt.hash(password, 12)
            .then(hashedPassword => {
                    const user = new User({
                        email,
                        password: hashedPassword,
                        name,
                        pic
                    })

                    user.save()
                    .then(user => {
                        res.json({ message: "saved successfully" });
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
        })
        .catch(err => {
            console.log(err);
        })
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(422).json({ error : "Please add email or password" });
    }

    User.findOne({ email : email })
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({ error : "Invalid email or password" });
        }

        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({ message : "Successfully singed in" });
                const token = jwt.sign({ _id : savedUser._id }, JWT_SECRET);
                const { _id, name, email, followers, following, pic } = savedUser;
                res.json({ token, user:{_id, name, email, followers, following, pic} });
            }
            else{
                return res.status(422).json({ error : "Invalid email or password" });
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})

module.exports = router;