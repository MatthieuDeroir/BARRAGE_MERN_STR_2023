import React, { useEffect } from "react";

function DataPage({ waterData }) {
  useEffect(() => {
    console.log(waterData);
  }, [waterData]);

  return (
    <div style={{ fontSize: "15px", display: "flex", flexDirection: "row" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#0E4194",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "173px",
            left: "8px",
            top: "21px",
            position: "absolute",
          }}
        >
          <img
            style={{
              width: "50px",
              height: "25px",
              left: "0px",
              top: "74px",
              position: "absolute",
            }}
            alt="Footer"
            src="/cote plan d'eau.png"
          />

          <img
            style={{
              width: "50px",
              height: "25px",
              left: "0px",
              top: "148px",
              position: "absolute",
            }}
            alt="Footer"
            src="/débit entrant.png"
          />
          <img
            style={{
              width: "50px",
              height: "25px",
              left: "0px",
              top: "0px",
              position: "absolute",
            }}
            alt="Footer"
            src="/débit entrant.png"
          />
        </div>
        <div
          style={{
            width: "68px",
            left: "64px",
            top: "20px",
            position: "absolute",
            color: "white",
            fontSize: "12px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Cote du plan d’eau :
        </div>
        <div
          style={{
            width: "80px",
            left: "64px",
            top: "100px",
            position: "absolute",
            color: "white",
            fontSize: "12px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Débit entrant:
        </div>
        <div
          style={{
            width: "80px",
            left: "64px",
            top: "174px",
            position: "absolute",
            color: "white",
            fontSize: "12px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          Débit sortant:
        </div>
        <div
          style={{
            width: "37px",
            height: "18px",
            left: "149px",
            top: "26px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          200
        </div>
        <div
          style={{
            left: "181px",
            top: "26px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          mNGF
        </div>
        <div
          style={{
            width: "37px",
            height: "18px",
            left: "149px",
            top: "95px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          200
        </div>
        <div
          style={{
            width: "37px",
            height: "18px",
            left: "149px",
            top: "170px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          200
        </div>
        <div
          style={{
            left: "186px",
            top: "95px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          m3/s
        </div>
        <div
          style={{
            left: "186px",
            top: "170px",
            position: "absolute",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          m3/s
        </div>
      </div>
    </div>
  );
}

export default DataPage;
