import React from "react";

const DataPage = ({ waterData }) => {
  return (
    <div
      style={{
        "--scale-factor": 1.5,
        width: "calc(288px * var(--scale-factor))",
        height: "calc(216px * var(--scale-factor))",
        position: "relative",
        backgroundColor: "#0E4194",
      }}
    >
      <img
        alt="logo"
        style={{
          width: "calc(288px * var(--scale-factor))",
          height: "calc(45px * var(--scale-factor))",
          left: "0px",
          top: "0px",
          position: "absolute",
        }}
        src="/HeaderImage.png"
      />
      <img
        alt="logo"
        style={{
          width: "calc(288px * var(--scale-factor))",
          height: "calc(21.60px * var(--scale-factor))",
          left: "0px",
          top: "calc(194px * var(--scale-factor))",
          position: "absolute",
        }}
        src="/FooterImage.png"
      />
      <div
        style={{
          width: "calc(279px * var(--scale-factor))",
          height: "calc(36px * var(--scale-factor))",
          left: "calc(4px * var(--scale-factor))",
          top: "calc(55px * var(--scale-factor))",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "calc(54.61px * var(--scale-factor))",
            height: "calc(27.50px * var(--scale-factor))",
            left: "0px",
            top: "calc(3px * var(--scale-factor))",
            position: "absolute",
          }}
          src="/cote plan d'eau.png"
        />
        <div
          style={{
            width: "calc(100px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(58.58px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            color: "white",
            fontSize: "calc(14px * var(--scale-factor))",
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
            width: "calc(69.50px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(153.90px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(22px * var(--scale-factor))",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.cote_plan_eau || 0}
        </div>
        <div
          style={{
            width: "calc(51.63px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(227.37px * var(--scale-factor))",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(13px * var(--scale-factor))",
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
          width: "calc(279px * var(--scale-factor))",
          height: "calc(36px * var(--scale-factor))",
          left: "calc(4px * var(--scale-factor))",
          top: "calc(103px * var(--scale-factor))",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "calc(53.28px * var(--scale-factor))",
            height: "calc(27.50px * var(--scale-factor))",
            left: "0px",
            top: "calc(2px * var(--scale-factor))",
            position: "absolute",
          }}
          src="./débit entrant.png"
        />
        <div
          style={{
            width: "calc(119.15px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(58.58px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            color: "white",
            fontSize: "calc(14px * var(--scale-factor))",
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
            width: "calc(69.50px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(153.90px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(22px * var(--scale-factor))",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.debit_entrant || 0}
        </div>
        <div
          style={{
            width: "calc(51.63px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(227.37px * var(--scale-factor))",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(13px * var(--scale-factor))",
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
          width: "calc(279px * var(--scale-factor))",
          height: "calc(36px * var(--scale-factor))",
          left: "calc(4px * var(--scale-factor))",
          top: "calc(151px * var(--scale-factor))",
          position: "absolute",
        }}
      >
        <img
          alt="logo"
          style={{
            width: "calc(53.28px * var(--scale-factor))",
            height: "calc(27.50px * var(--scale-factor))",
            left: "0px",
            top: "calc(2px * var(--scale-factor))",
            position: "absolute",
          }}
          src="/débit sortant.png"
        />
        <div
          style={{
            width: "calc(119.15px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(58.58px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            color: "white",
            fontSize: "calc(14px * var(--scale-factor))",
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
            width: "calc(69.50px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(153.90px * var(--scale-factor))",
            top: "calc(1px * var(--scale-factor))",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(22px * var(--scale-factor))",
            fontFamily: '"D-DIN-Bold"',
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          {waterData?.debit_sortant || 0}
        </div>
        <div
          style={{
            width: "calc(51.63px * var(--scale-factor))",
            height: "calc(35px * var(--scale-factor))",
            left: "calc(227.37px * var(--scale-factor))",
            top: "0px",
            position: "absolute",
            textAlign: "center",
            color: "white",
            fontSize: "calc(13px * var(--scale-factor))",
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

    </div>);
};
export default DataPage;