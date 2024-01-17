const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  // Create new user
  const user = new User({
    ...userData,
    password: hashedPassword
  });
  // Save user to database
  return await user.save();
};

const authenticateUser = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found!');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is incorrect!');
  }
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found!');
  }
  return user;
};

module.exports = {
  createUser,
  authenticateUser,
  getUserById
};
