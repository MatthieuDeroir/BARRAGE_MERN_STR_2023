const userService = require('../Services/userService');

async function getAll(req, res) {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function getById(req, res) {
    try {
        const user = await userService.getById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function create(req, res) {
    try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function update(req, res) {
    try {
        const user = await userService.update(req.params.id, req.body);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function deleteById(req, res) {
    try {
        const user = await userService.deleteById(req.params.id);
        if (!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
