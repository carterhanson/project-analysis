const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/info', (req, res) => {
    if(req.session && req.session.user){
        //there is a user logged in
        res.json({username: req.session.user.username})
    }else{
        res.status(401).json({message: 'User not logged in'});
    }
})

// user registration
router.post('/register', async (req, res) => {
    // get data from post body
    const username = req.body.username;
    const password = req.body.password;

    //check if the user already exists
    const userExists = await User.findOne({where: {username}});
    if(userExists){
        return res.status(400).json({message: 'Username taken'});
    }

    // create the new user

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username: username,
        password: hashedPassword
    });

    //initialize session (logging in user right away)
    req.session.user = newUser;

    res.json({message: "Successful registration", newUser});

});

// User Login Route
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Initialize user session
    req.session.user = user;

    res.json({ message: 'Logged in successfully' });
});

router.put('/update', async (req, res) => {

    const username = req.body.email;
    const password = req.body.password;
    
    if(!req.session || !req.session.user){
        return res.status(401).json({message: "Not logged in"});
    }

    //find user
    const user = await User.findByPk(req.session.user.id);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    if(username){
        user.username = username;
    }

    if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    //save the updates
    await user.save();

    res.json({message: 'update successfull'});

})

// User Logout Route
router.post('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out, please try again' });
        } else {
            return res.json({ message: 'Logged out successfully' });
        }
    });
});





module.exports = router;