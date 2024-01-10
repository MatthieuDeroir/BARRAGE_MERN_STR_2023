const sequelize = require("../Database/Sequelize");

const Data = require("./DataModel");
const Media = require("./MediaModel");
const Slideshow = require("./SlideshowModel");
const SlideshowStatus = require("./SlideshowStatusModel");
const User = require("./UserModel");
const Settings = require("./SettingsModel");
const SlideshowMedia = require("./SlideshowMediaModel");

Media.belongsTo(Slideshow);
Slideshow.hasMany(Media, { as: "medias" });

module.exports = {
	Data,
	Media,
	Slideshow,
	SlideshowStatus,
	User,
	Settings,
	SlideshowMedia
};
