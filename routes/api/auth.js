const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

//@route  GET api/auth
//@desc   Test route
//@access Public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        const admin = await Admin.findById(req.user.id).select('-password');
        if(user){
        res.json(user);
        }
        else{
            res.json(admin);
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route  POST api/auth
//@desc   Authenticate user and get token
//@access Public
router.post('/',[
    check('email', 'Enter valid email.').isEmail(),
    check('password', 'Password is required.').exists()
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try {
            //See if the user exists
            let user = await User.findOne({email});
            let admin = await Admin.findOne({email});

            if(!user && !admin){
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]});
            }

            //Check user credentials
            if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]});
            }
        }
            else{
            const isMatchAdmin = await bcrypt.compare(password, admin.password);
                if(!isMatchAdmin){
                    return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]});
                }
        }

            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000}, 
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});
// //@route  POST api/adminlogin
// //@desc   Authenticate user and get token
// //@access Public
// router.post('/adminlogin',[
//     check('email', 'Enter valid email.').isEmail(),
//     check('password', 'Password is required.').exists()
// ],
// async (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const {name, email, password} = req.body;

//     try {
//             //See if the user exists
//             let admin = await Admin.findOne({email});

//             if(!admin){
//                 return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]});
//             }

//             //Check user credentials
//             const isMatch = await bcrypt.compare(password, admin.password);

//             if(!isMatch){
//                 return res.status(400).json({ errors: [{ msg: 'Invalid credentials.'}]});
//             }

//             //Return jsonwebtoken
//             const payload = {
//                 admin: {
//                     id: admin.id
//                 }
//             }

//             jwt.sign(
//                 payload,
//                 config.get('jwtSecret'),
//                 { expiresIn: 360000}, 
//                 (err, token) => {
//                     if(err) throw err;
//                     res.json({ token });
//                 });
//     }catch(err){
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }

// });
module.exports = router;