import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function AuthLayout({ children, bottomText }) {
  console.log("✅ AuthLayout is rendering");
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        p: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          RSS <span style={{ fontFamily: "serif" }}>ملخص</span>
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600, fontFamily: "serif" }}>
          JARAYID<span style={{ color: "#1976d2" }}>.com</span>
        </Typography>
      </Box>

      {/* Card */}
      <Card
        sx={{ maxWidth: 400, width: "100%", borderRadius: 2, boxShadow: 3 }}
      >
        <CardContent sx={{ p: 4 }}>{children}</CardContent>
      </Card>

      {/* Bottom link if provided */}
      {bottomText && (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {bottomText}
        </Typography>
      )}
    </Box>
  );
}
