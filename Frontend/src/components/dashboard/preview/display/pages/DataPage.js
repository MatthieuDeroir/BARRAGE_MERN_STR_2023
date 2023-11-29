import React from "react";

function DataPage({ data1, data2, data3, imgUrl }) {
  return (
    <div style={{ fontSize: "15px", display: "flex", flexDirection: "row" }}>
      <div
        style={{
          flex: 1,
          flexDirection: "column",
          color: "white",
          padding: "5px",
        }}
      >
        <div style={{ marginTop: "20px" }}>
        <div >débit entrant:</div>
        <div style={{ marginBottom: "15px", fontSize: "25px" }}> 200</div>
        <div >debit sortant:</div>
        <div style={{ marginBottom: "15px", fontSize: "25px" }}> 200</div>
        </div>
      </div>
      <div style={{ flex: 1, color: "white", padding: "5px" }}>
        <img
          style={{ width: "100px",marginBottom: "15px" }}
          src={"maxresdefaultjpg_59db3b481346e.jpg"}
          alt="description"
        />
        <div>cote du plan d'eau:</div>
        <div style={{ marginBottom: "15px", fontSize: "25px" }}> 200</div>
      </div>
    </div>
  );
}

export default DataPage;
