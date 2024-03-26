import React, { useEffect } from "react";

function DataPage({ waterData }) {
  /*  useEffect(() => {
    console.log(waterData);
  }, [waterData?]); */

  return (
    <div
      style={{
        width: "288px",
        height: "216px",
        position: "relative",
        backgroundColor: "#0E4194",
      }}
    >
      <img
        alt="logo"
        style={{
          width: "288px",
          height: "45px",
          left: "0px",
          top: "0px",
          position: "absolute",
        }}
        src="/HeaderImage.png"
      />
      <img
        alt="logo"
        style={{
          width: "288px",
          height: "21.60px",
          left: "0px",
          top: "194px",
          position: "absolute",
        }}
        src="/FooterImage.png"
      />
      <div
        style={{
          width: "279px",
          height: "36px",
          left: "4px",
          top: "55px",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "54.61px",
            height: "27.50px",
            left: "0px",
            top: "3px",
            position: "absolute",
          }}
          src="/cote plan d'eau.png"
        />
        <div
          style={{
            width: "100px",
            height: "35px",
            left: "58.58px",
            top: "1px",
            position: "absolute",
            color: "white",
            fontSize: "14px",
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
            width: "69.50px",
            height: "35px",
            left: "153.90px",
            top: "1px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "22px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.cote_plan_eau || 0}
        </div>
        <div
          style={{
            width: "51.63px",
            height: "35px",
            left: "227.37px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "13px",
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
          width: "279px",
          height: "36px",
          left: "4px",
          top: "103px",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "53.28px",
            height: "27.50px",
            left: "0px",
            top: "2px",
            position: "absolute",
          }}
          src="./débit entrant.png"
        />
        <div
          style={{
            width: "119.15px",
            height: "35px",
            left: "58.58px",
            top: "1px",
            position: "absolute",
            color: "white",
            fontSize: "14px",
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
            width: "69.50px",
            height: "35px",
            left: "153.90px",
            top: "1px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "22px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.debit_entrant || 0}
        </div>
        <div
          style={{
            width: "51.63px",
            height: "35px",
            left: "227.37px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "13px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          m3/s
        </div>
      </div>
      <div
        style={{
          width: "279px",
          height: "36px",
          left: "4px",
          top: "151px",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "53.28px",
            height: "27.50px",
            left: "0px",
            top: "2px",
            position: "absolute",
          }}
          src="/débit sortant.png"
        />
        <div
          style={{
            width: "119.15px",
            height: "35px",
            left: "58.58px",
            top: "1px",
            position: "absolute",
            color: "white",
            fontSize: "14px",
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
            width: "69.50px",
            height: "35px",
            left: "153.90px",
            top: "1px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "22px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.debit_sortant || 0}
        </div>
        <div
          style={{
            width: "51.63px",
            height: "35px",
            left: "227.37px",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "13px",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
            display: "flex",
            alignItems: "center",
          }}
        >
          m3/s
        </div>
      </div>
    </div>
  );
}

export default DataPage;
