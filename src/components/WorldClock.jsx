import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const clockConfig = [
  {
    key: "india",
    label: "INDIA",
    timeZone: "Asia/Kolkata",
    flag: "/images/india.png",
  },
  {
    key: "uae",
    label: "UAE",
    timeZone: "Asia/Dubai",
    flag: "/images/uae.png",
  },
  {
    key: "london",
    label: "LONDON",
    timeZone: "Europe/London",
    flag: "/images/uk.png",
  },
  {
    key: "usa",
    label: "USA",
    timeZone: "America/New_York",
    flag: "/images/usa.png",
  },
];

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const updatedTimes = {};

      clockConfig.forEach((clock) => {
        updatedTimes[clock.key] = now.toLocaleTimeString("en-US", {
          ...timeOptions,
          timeZone: clock.timeZone,
        });
      });

      setTimes(updatedTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(20, 16, 12, 0.75) 0%, rgba(35, 28, 20, 0.8) 50%, rgba(15, 12, 8, 0.75) 100%)",
        backdropFilter: "blur(12px)",
        borderRadius: { xs: "12px", md: "1.2vw" },
        border: "0.15vw solid rgba(223, 186, 115, 0.3)",
        padding: {
          xs: "12px 8px",
          sm: "0.8vw 1.5vw",
        },
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(4, 1fr)",
        },
        gap: {
          xs: "12px 8px",
          sm: "1vw",
        },
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      {clockConfig.map((clock, index) => (
        <Box
          key={clock.key}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: {
              xs: "10px",
              md: "0.8vw",
            },
            paddingLeft: {
              xs: "8px",
              sm: index !== 0 ? "1vw" : "0",
            },
            borderLeft: {
              xs: "none",
              sm: index !== 0 ? "1px solid rgba(223, 186, 115, 0.2)" : "none",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "24px",
                md: "2.1vw",
              },
              height: {
                xs: "24px",
                md: "2.1vw",
              },
              borderRadius: "50%",
              overflow: "hidden",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            <img
              src={clock.flag}
              alt={clock.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "11px",
                  md: "1.2vw",
                },
                fontWeight: 700,
                color: "rgba(223, 186, 115, 0.85)",
                letterSpacing: "0.08em",
                lineHeight: 1.1,
              }}
            >
              {clock.label}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "13px",
                  md: "1.2vw",
                },
                fontWeight: 800,
                color: "#ffffff",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1.1,
                marginTop: "2px",
              }}
            >
              {times[clock.key] || "--:--"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WorldClockHorizontal;
