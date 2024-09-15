const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password, preferences } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('Email already exists');

            if(!name){
                res.status(400).json({msg: "Name field is empty"})
            }

            if(!preferences){
                res.status(400).json({msg: "Select your prefered topic"})
            }

            const newUser = new User({ name, email, password, preferences });
            
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            if (error.name === 'ValidationError') {
              // Handle validation error (e.g., invalid password)
              return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Server error', error });
          }
},

}

module.exports = userController;