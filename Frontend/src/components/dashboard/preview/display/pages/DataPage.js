import React from "react";

function DataPage({ data1, data2, data3, imgUrl }) {
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
					<div style={{ marginBottom: "15px", fontSize: "25px" }}> 132.728 m³/s</div>
					<div>Débit sortant:</div>
					<div style={{ marginBottom: "15px", fontSize: "25px" }}> 127.891 m³/s</div>

				</div>

			</div>
			<div style={{ flex: 1, color: "white", padding: "5px" }}>
				<img
					style={{ width: "100px", marginBottom: "15px" }}
					src={"maxresdefaultjpg_59db3b481346e.jpg"}
					alt="description"
				/>
				<div>Côte du plan d'eau:</div>
				<div style={{ marginBottom: "15px", fontSize: "25px" }}> 421.62 mNGF</div>
			</div>
		</div>
	);
}

export default DataPage;
