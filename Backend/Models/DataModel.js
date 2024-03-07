const { DataTypes } = require("sequelize");
const sequelize = require("../Database/Sequelize");

const Data = sequelize.define("Data", {
		debit_entrant: {
			type: DataTypes.STRING,
			defaultValue: "N/A",
			allowNull: false
		},
		debit_sortant: {
			type: DataTypes.STRING,
			allowNull: false
		},
	cote_plan_eau:{
			type: DataTypes.STRING,
			allowNull: false
	},
	client1Connected: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	client2Connected: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
},
	{
		timestamps: false,
		tableName: "Data"
	}
);

module.exports = Data;
