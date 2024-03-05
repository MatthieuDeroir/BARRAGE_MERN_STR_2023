import React, { useEffect } from "react";

function DataPage({ waterData }) {
  useEffect(() => {
    console.log(waterData);
  }, [waterData]);

  return (
    <div style={{ fontSize: "15px", display: "flex", flexDirection: "row" }}>
      <img
        style={{
          height: "auto",
          width: "228px",
        }}
        alt="Data"
        src="/DataImage.png"
      />
    </div>
  );
}

export default DataPage;
