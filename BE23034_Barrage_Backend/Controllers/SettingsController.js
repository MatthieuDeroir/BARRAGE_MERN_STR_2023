const Settings = require("../Models/SettingsModel");

exports.initializeSettings = async () => {
  try {
    const count = await Settings.count();

    if (count === 0) {
      await Settings.create({
        enable: false,
        start: "9:00",
        stop: "23:00",
      });
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation des paramètres :", error);
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    res.status(200).send(settings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Settings.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedSettings = await Settings.findOne({ where: { id: id } });
      return res.status(200).send(updatedSettings);
    }
    throw new Error("Setting not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.addSettings = async (req, res) => {
  try {
    const setting = await Settings.create(req.body);
    res.status(201).send(setting);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Settings.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(200).send("Setting deleted");
    }
    throw new Error("Setting not found");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
