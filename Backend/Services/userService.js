const userRepository = require("../Repositories/userRepository");

async function getAll() {
  return await userRepository.getAll();
}

async function getById(id) {
  return await userRepository.getById(id);
}

async function create(user) {
  return await userRepository.create(user);
}

async function update(id, updatedUser) {
  return await userRepository.update(id, updatedUser);
}

async function deleteById(id) {
  return await userRepository.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
