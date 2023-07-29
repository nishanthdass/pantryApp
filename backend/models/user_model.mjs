// Import necessary modules
import mongoose from './db_connect.mjs'; // Import the mongoose instance from db_connect.mjs
import jwt from 'jsonwebtoken';



// Define the user schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Function to create a new user
const createUser = async (email, username, password) => {
  try {
    const user = new User({ email, username, password });
    return await user.save();
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  }
};

// Function to find a user by ID
const findUserById = async (_id) => {
  const query = User.findById(_id);
  return query.exec();
};

// Function to find users based on filter, projection, and limit
const findUsers = async (filter, projection, limit) => {
  const query = User.find(filter).select(projection).limit(limit);
  return query.exec();
};

// Function to generate a JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET; // Replace this with your own JWT secret
  const expiresIn = '6h'; // Token expiration time
  return jwt.sign({ id }, secret, { expiresIn });
};

// Export necessary functions and models
export { createUser, findUserById, findUsers, generateToken };
