import React from "react";
import { Box, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";

const NewsTicker = ({ newsItems = [] }) => {
  const items =
    newsItems.length > 0
      ? newsItems
      : [{ description: "Welcome to Aurasia Updates" }];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "38px",
          lg: "2.7vw",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backdropFilter: "blur(0.6vw)",
        background: `
          linear-gradient(
            90deg,
            rgba(15, 12, 8, 0.85) 0%,
            rgba(30, 24, 18, 0.8) 40%,
            rgba(10, 8, 6, 0.9) 100%
          )
        `,
        borderTop: "0.05vw solid rgba(223, 186, 115, 0.2)",
        borderBottom: "0.05vw solid rgba(223, 186, 115, 0.15)",
        boxShadow: `
          inset 0 0 1vw rgba(223, 186, 115, 0.05),
          0 0 1vw rgba(0,0,0,0.18)
        `,
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          color: "#1e180d",
          background:
            "linear-gradient(135deg, #DFBA73 0%, #C5A059 100%)",
          fontSize: {
            xs: "14px",
            lg: "1.4vw",
          },
          fontWeight: 900,
          whiteSpace: "nowrap",
          padding: "0 3.5vw",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        Aurasia Updates
      </Typography> 

      {/* NEWS TICKER */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Marquee
          speed={40}          // Lower = slower
          gradient={false}
          autoFill={true}
          loop={0}
          direction="left"       // Infinite
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{

                textTransform: "lowercase",
                color: "#fff",
                fontSize: {
                  xs: "14px",
                  lg: "1.5vw",
                },
                fontWeight: 800,
                whiteSpace: "nowrap",
                mx: "1vw",
                flexShrink: 0,
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Marquee>
      </Box>
    </Box>
  );
};

export default NewsTicker;