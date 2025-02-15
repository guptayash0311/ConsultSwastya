const express = require("express");
const router = new express.Router();
const userdb = require("../models/UserSchema");
var bcrypt = require("bcryptjs");
const authenticate=require("../middleware/authenticate");



router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "Fill all details" })
    }

    try {

        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "User already exist. Please LogIn!" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password does not match." })
        } else {
            const finalUser = new userdb({
                fname, email, password, cpassword
            });

            // here password hasing

            const storeData = await finalUser.save();

            res.status(201).json({ status: 201, storeData })
            console.log(storeData);
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("Catch block error:", error);
    }

});

// User Login
router.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
        const userValid = await userdb.findOne({ email: email });

        if (userValid) {

            const isMatch = await bcrypt.compare(password, userValid.password);

            if (!isMatch) {
                res.status(422).json({ error: "invalid details" })
            } else {

                // token generate
                const token = await userValid.generateAuthtoken();
                // console.log(token);

                //cookiegenerate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result })
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});

// user valid
router.get("/validuser",authenticate,async(req,res)=>{
    // console.log("done");
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});



module.exports = router;