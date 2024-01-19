const User = require("../Models/userModel");

async function getAll() {
  return User.find().sort({ createdAt: "desc" });
}

async function getById(id) {
  return User.findById(id);
}

async function create(user) {
  const newUser = new User(user);
  return await newUser.save();
}

async function update(id, updatedUser) {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  Object.assign(user, updatedUser);
  user.updatedAt = Date.now();

  return await user.save();
}

async function deleteById(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
