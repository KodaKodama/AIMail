const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password} = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({msg: "Email already Exists"})

            if(!name){
                return res.status(400).json({msg: "Name field is empty"})
            }

            // if(!preferences){
            //   return res.status(400).json({msg: "Select your prefered topic"})
            // }

            const newUser = new User({ name, email, password });
            
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            if (error.name === 'ValidationError') {
              // Handle validation error (e.g., invalid password)
              return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Server error', error });
          }
},

login: async(req, res) => {
  console.log('inside login');
  
    try {
      console.log(req.body);  
      const { email, password } = req.body;
      console.log(`Email: ${email}, Password: ${password}`);  
      const user = await User.findOne({ email });
  
      if (!user || !(await user.isValidPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT and send it
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'development', sameSite: 'Strict',}); // Set secure to true in production
      res.status(200).json({ message: 'Logged in successfully' });
  }catch(err){
      return res.status(500).json({message: err.message});
  }
},

  getUsers: async(req, res) => {
    try{
      return await User.find();
    }catch(e){
      return res.satus(500).json({
        message: e.message
      });
    }
} 
}


module.exports = userController;