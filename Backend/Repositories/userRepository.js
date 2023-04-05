const User = require('../Models/userModel');

async function getAll() {
    return await User.find().sort({ createdAt: 'desc' });
}

async function getById(id) {
    return await User.findById(id);
}

async function create(user) {
    const newUser = new User(user);
    return await newUser.save();
}

async function update(id, updatedUser) {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    Object.assign(user, updatedUser);
    user.updatedAt = Date.now();

    return await user.save();
}

async function deleteById(id) {
    return await User.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
