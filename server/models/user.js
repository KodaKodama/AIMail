const mongooose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongooose.Schema({
    name: { type: String, required: true},
    email: { type: String, require: true },
    password: { type: String, required: true,
        validator: function(v) {
            // Validation for password with regex
            return /[A-Z]/.test(v) && // At least one uppercase letter
                   /[a-z]/.test(v) && // At least one lowercase letter
                   /\d/.test(v) &&    // At least one number
                   /[@$!%*?&]/.test(v); // At least one special character
        },
        message: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.'
     },
     preferences: [
        {
            topic: { type: String },  // E.g., 'backend', 'frontend'
            subtopics: { type: [String], default: [] }, // E.g., 'API design', 'React optimization'
        },
     ],
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


// Method to validate password during login
userSchema.methods.isValidPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};


const User = mongooose.model("User", userSchema);

module.exports = User;