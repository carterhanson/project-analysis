const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/info', (req, res) => {
    if(req.session && req.session.user){
        res.json({username: req.session.user.username})
    }else{
        res.status(401).json({message: 'User not logged in'});
    }
})

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await User.findOne({where: {username}});
    if(userExists){
        return res.status(400).json({message: 'Username taken'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username: username,
        password: hashedPassword
    });

    req.session.user = newUser;
    
    res.json({message: "Successful registration", newUser});
})

module.exports = router;