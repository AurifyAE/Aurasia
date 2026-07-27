import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to Aurasia Updates" }];

  return (
    <>
      <style>{`
        @keyframes livePulse {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7);
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
            box-shadow: 0 0 0 0.5vw rgba(255, 59, 48, 0);
          }
          100% {
            transform: scale(0.85);
            opacity: 0.6;
            box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7);
          }
        }
      `}</style>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: "42px",
            lg: "3.2vw",
          },
          display: "flex",
          overflow: "hidden",
          backdropFilter: "blur(1vw)",
          background:
            "linear-gradient(90deg, rgba(15, 12, 10, 0.95) 0%, rgba(24, 18, 14, 0.9) 50%, rgba(12, 10, 8, 0.98) 100%)",
          borderTop: "0.08vw solid rgba(223, 186, 115, 0.3)",
          borderBottom: "0.08vw solid rgba(223, 186, 115, 0.15)",
          boxShadow:
            "0 -0.2vw 2vw rgba(223, 186, 115, 0.05), inset 0 0 1.5vw rgba(223, 186, 115, 0.03)",
        }}
      >
        {/* LEFT BRAND BADGE (Floating capsule style) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.6vw",
            padding: " 0 1.4vw",
            flexShrink: 0,
            zIndex: 2,
            borderRight: "0.08vw solid rgba(223, 186, 115, 0.15)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Outfit', sans-serif !important",
              color: "#dfba73",
              fontSize: {
                xs: "11px",
                lg: "0.9vw",
              },
              fontWeight: 800,
              whiteSpace: "nowrap",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Aurasia Updates
          </Typography>
        </Box>

        {/* NEWS TICKER (With edge-fade overlay effect) */}
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            height: "100%",
            display: "flex",
            alignItems: "center",
            zIndex: 1,
            maskImage:
              "linear-gradient(to right, transparent 0%, black 3vw, black calc(100% - 3vw), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 3vw, black calc(100% - 3vw), transparent 100%)",
          }}
        >
          <Marquee
            speed={35}
            gradient={false}
            autoFill={true}
            loop={0}
            direction="left"
          >
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "'Outfit', sans-serif !important",
                    color: "#f3ede4",
                    fontSize: {
                      xs: "14px",
                      lg: "1.2vw",
                    },
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    mx: "1.5vw",
                    letterSpacing: "0.03em",
                    flexShrink: 0,
                  }}
                >
                  {item?.description || ""}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: "'Outfit', sans-serif !important",
                    color: "#dfba73",
                    fontSize: {
                      xs: "14px",
                      lg: "1.1vw",
                    },
                    fontWeight: 700,
                    mx: "1vw",
                    userSelect: "none",
                    opacity: 0.8,
                    filter: "drop-shadow(0 0 0.3vw rgba(223, 186, 115, 0.4))",
                  }}
                >
                  ✦
                </Typography>
              </React.Fragment>
            ))}
          </Marquee>
        </Box>
      </Box>
    </>
  );
};

export default NewsTicker;
