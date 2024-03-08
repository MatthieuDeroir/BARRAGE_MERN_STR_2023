import React, { useEffect } from "react";

function DataPage({ waterData }) {
	useEffect(() => {
		if (waterData === undefined) {
			waterData = { debit_entrant: 0, debit_sortant: 0, cote_plan_eau: 0 };
		}
	});
	return (
		<div style={{ fontSize: "15px", display: "flex", flexDirection: "row" }}>
			<div
				style={{
					flex: 1,
					flexDirection: "column",
					color: "white",
					padding: "5px"
				}}
			>
				<div style={{ marginTop: "20px" }}>
					<div>Débit entrant:</div>
					<div style={{ marginBottom: "15px", fontSize: "25px" }}> ${waterData?.debit_entrant || 0}</div>
					<div>Débit sortant:</div>
					<div style={{ marginBottom: "15px", fontSize: "25px" }}> ${waterData?.debit_sortant || 0}</div>

				</div>

			</div>
			<div style={{ flex: 1, color: "white", padding: "5px" }}>
				<img
					style={{ width: "100px", marginBottom: "15px" }}
					src={"maxresdefaultjpg_59db3b481346e.jpg"}
					alt="description"
				/>
				<div>Côte du plan d'eau:</div>
				<div style={{ marginBottom: "15px", fontSize: "25px" }}> ${waterData?.cote_plan_eau || 0}</div>
			</div>
		</div>
	);
}

export default DataPage;
