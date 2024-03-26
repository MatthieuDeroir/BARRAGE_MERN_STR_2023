const Data = require("../Models/DataModel");

exports.initializeDatas = async () => {
	try {
		const nombreDatasInitiaux = 1;
		const count = await Data.count();

		if (count < nombreDatasInitiaux) {
			const dataNeeded = nombreDatasInitiaux - count;

			for (let i = 0; i < dataNeeded; i++) {
				await Data.create({
					debit_entrant: 0,
					debit_sortant: 0,
					cote_plan_eau: 0
				});
			}
		}
	} catch (error) {
		console.error("Erreur lors de l'initialisation des camions :", error);
	}
};


exports.addData = async (req, res) => {
	try {
		const data = await Data.create(req.body);
		res.status(201).send(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
};





exports.getDatas = async (req, res) => {
	try {
		const datas = await Data.findAll();
		res.status(200).send(datas);
	} catch (error) {
		res.status(500).send(error.message);
	}
};


exports.deleteData = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Data.destroy({
			where: { id }
		});

		if (!data) {
			return res.status(404).send("Data not found");
		}

		res.status(200).send({ message: "Data deleted successfully" });
	} catch (error) {
		res.status(500).send(error.message);
	}
};


exports.updateDatas = async (req, res) => {
	try {
		await Data.destroy({
			where: {},
			truncate: true // Cette option supprime tous les enregistrements de la table
		});

		const updatedDatas = await Data.bulkCreate(
			req.body.map(data => ({
				...data
			}))
		);

		res.status(201).send(updatedDatas);
	} catch (error) {
		res.status(400).send(error.message);
	}
};


exports.updateClientStatus = async (clientId, isConnected) => {
    try {
        const data = await Data.findOne();
        if (!data) {
            console.error("Aucune donnée trouvée pour mettre à jour l'état du client.");
            return;
        }
        
        if (clientId === "1") {
            data.client1Connected = isConnected;
        } else if (clientId === "2") {
            data.client2Connected = isConnected;
        }
        
        await data.save();
        console.log(`L'état de connexion pour le client ${clientId} a été mis à jour : ${isConnected}`);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'état de connexion du client:", error);
    }
};


