import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.screen.width <= 768); // 🔥 screen.width ignores zoom
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const getColors = (dir) => {
    if (dir === "rise")
      return {
        bgColor: "#55d500",
        border: "1px solid #55d500",
        color: "white",
      };
    if (dir === "fall")
      return {
        bgColor: "#ff0000",
        border: " 1px solid #ff0000",
        color: "white",
      };
    return {
      bgColor: "#F0F8FF00",
      border: " 1px solid #FFFFFF",
      color: "#fff",
    };
  };

  const PricePulse = ({ label, value, dir }) => {
    const { bgColor, border, color } = getColors(dir);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: ".5vw",

          overflow: "hidden",
          ...(hasPulse && {
            animation:
              dir === "rise"
                ? "pulseRise 0.8s ease-out"
                : "pulseFall 0.8s ease-out",
            bgcolor:
              dir === "rise"
                ? "0 0 0 0 rgba(0,255,157,0.6)"
                : "0 0 0 0 rgba(255,51,102,0.6)",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.3vw",
            },
            fontWeight: 800,
            letterSpacing: "0.25vw",
            color: "#fff",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "20px",
              sm: "2.8vw",
              md: "2.2vw",
              lg: "2.8vw",
              xl: "2.8vw",
            },
            fontWeight: 900,
            letterSpacing: "0.18vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: color,
            border: border,
            borderRadius: "1vw",
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isSilver = theme === "silver";

    let title = "GOLD";
    let gradient = "linear-gradient(90deg, #FFF098)";
    let shadow = "0 0 3vw rgba(255 217 0 / 0.11) inset";

    if (isSilver) {
      title = "SILVER";
      gradient = "linear-gradient(90deg, #FFFFFF )";
      shadow = "0 0 3vw rgba(160,180,255,0.15) inset";
    }

    return (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",

          borderRadius: "1.8vw",

          backdropFilter: "blur(0.8vw)",

          background: `linear-gradient(135deg, rgba(20, 16, 12, 0.7) 0%, rgba(35, 28, 20, 0.75) 50%, rgba(15, 12, 8, 0.7) 100%)`,
          border: "0.18vw solid rgba(223, 186, 115, 0.35)",
          padding: {
            xs: "2vw 3vw",
            sm: "0.5vw 2vw",
            md: "1.5vw 1vw",
          },

          display: "grid",
          alignItems: "center",
          gap: "1vw",
          gridTemplateColumns: ".7fr 1fr 1fr",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,

            padding: "0.08vw", // border thickness
            // borderRadius: "inherit",
            borderRadius: "1.6vw",

            background: `
      linear-gradient(
        150deg,
        rgba(223, 186, 115, 0.4) 0%,
        rgba(255, 215, 0, 0.5) 35%,
        rgba(184, 134, 11, 0.2) 70%,
        rgba(255, 223, 128, 0.4) 100%
      )
    `,

            WebkitMask: `
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0)
    `,

            WebkitMaskComposite: "xor",
            maskComposite: "exclude",

            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "5.5vw",
              height: "5.5vw",
              objectFit: "contain",
            }}
            component="img"
            src={isSilver ? "/images/silver-bar.png" : "/images/gold-bar.png"}
            alt={title}
          />

          <Box
            sx={{
              fontSize: { xs: "15px", md: "1.7vw" },
              fontWeight: 900,

              letterSpacing: "0.1em",
              background: isSilver
                ? "linear-gradient(90deg, #CCFBFF,#9AC6FF)"
                : "linear-gradient(90deg, #FFF7CC,#FFCD9A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: "1",
            }}
          >
            {title}
          </Box>
        </Box>

        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",

            fontWeight: "900",
          }}
        >
          <PricePulse label="BID" value={data.bid} dir={bidDir} />
          LOW <span className="hl-value-low text-[#ff0000]">{data.low}</span>
        </Box>

        {/* Price Boxes */}
        <Box
          sx={{
            fontSize: {
              xs: "14px",
              sm: "2.2vw",
              md: "1.6vw",
              lg: "1.4vw",
              xl: "1.2vw",
            },
            color: "#fff",
            fontWeight: "900",
          }}
        >
          <PricePulse label="ASK" value={data.ask} dir={askDir} />
          HIGH <span className="hl-value-high text-[#afff79]">{data.high}</span>
        </Box>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: "1vw",
        width: "100%",
        alignItems: "end",
        marginTop: {
          xs: "20px", // mobile
          sm: "0vw", // small tablets
        },
        gridTemplateColumns: { xs: "1fr" },
      }}
    >
      <MetalPanel
        data={goldData}
        bidDir={goldBidDir}
        askDir={goldAskDir}
        theme="gold"
      />

      <MetalPanel
        data={silverData}
        bidDir={silverBidDir}
        askDir={silverAskDir}
        theme="silver"
      />
    </Box>
  );
};

export default SpotRate;
