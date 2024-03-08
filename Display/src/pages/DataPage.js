import React, { useEffect } from "react";

function DataPage({ waterData }) {
  /*  useEffect(() => {
    console.log(waterData);
  }, [waterData?]); */

  return (
    <div
      style={{
        width: "320px",
        height: "240px",
        position: "relative",
        backgroundColor: "#0E4194",
      }}
    >
      <img
        alt="Header"
        style={{
          width: "320px",
          height: "50px",
          left: "0px",
          top: "0px",
          position: "absolute",
        }}
        src="/HeaderImage.png"
      />
      <div
        style={{
          width: "307px",
          height: "35px",
          left: "6px",
          top: "60px",
          position: "absolute",
        }}
      >
        <img
          alt="Cote du plan d’eau :"
          style={{
            width: "65px",
            height: "32.50px",
            left: "0px",
            top: "2px",
            position: "absolute",
          }}
          src="/cote plan d'eau.png"
        />
        <div
          style={{
            width: "120px",
            height: "35px",
            left: "74px",
            top: "0px",
            position: "absolute",
            color: "white",
            fontSize: "17px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          Cote du plan d’eau :
        </div>
        <div
          style={{
            width: "70px",
            height: "35px",
            left: "186px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {waterData?.cote_plan_eau || 0}
        </div>
        <div
          style={{
            width: "52px",
            height: "35px",
            left: "272px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          mNGF
        </div>
      </div>
      <div
        style={{
          width: "308px",
          height: "35px",
          left: "6px",
          top: "115px",
          position: "absolute",
        }}
      >
        <img
          alt="Débit entrant:"
          style={{
            width: "65px",
            height: "32.50px",
            left: "0px",
            top: "2px",
            position: "absolute",
          }}
          src="./débit entrant.png"
        />
        <div
          style={{
            width: "120px",
            height: "35px",
            left: "74px",
            top: "0px",
            position: "absolute",
            color: "white",
            fontSize: "17px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          Débit entrant:
        </div>
        <div
          style={{
            width: "52px",
            height: "35px",
            left: "272px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          m3/s
        </div>
        <div
          style={{
            width: "70px",
            height: "35px",
            left: "187px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {waterData?.debit_entrant || 0}
        </div>
      </div>
      <div
        style={{
          width: "308px",
          height: "35px",
          left: "6px",
          top: "170px",
          position: "absolute",
        }}
      >
        <img
          alt="Débit sortant:"
          style={{
            width: "65px",
            height: "32.50px",
            left: "0px",
            top: "2px",
            position: "absolute",
          }}
          src="/débit sortant.png"
        />
        <div
          style={{
            width: "120px",
            height: "35px",
            left: "74px",
            top: "0px",
            position: "absolute",
            color: "white",
            fontSize: "18px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          Débit sortant:
        </div>
        <div
          style={{
            width: "52px",
            height: "35px",
            left: "272px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "16px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          m3/s
        </div>
        <div
          style={{
            width: "70px",
            height: "35px",
            left: "187px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {waterData?.debit_sortant || 0}
        </div>
      </div>
      <img
        alt="Footer"
        style={{
          width: "320px",
          height: "24px",
          left: "0px",
          top: "216px",
          position: "absolute",
        }}
        src="/FooterImage.png"
      />
    </div>
  );
}

export default DataPage;
