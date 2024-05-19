import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate if all required fields are present
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all the fields' });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if the password matches
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a JWT token for the authenticated user
        const token = createToken(user._id);

        res.status(200).json({ success: true, token });

    } catch (error) {
        // Log the error to the console
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Token creation function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user function
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    // Validate if all required fields are present
    if (!name || !password || !email) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email' });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Please enter a strong password' });
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        // Save new user to database
        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id);

        // Respond with success
        res.status(201).json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export { loginUser, registerUser };
