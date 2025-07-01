import React from "react";
import {
  TextField,
  Typography,
  Button,
  Link,
  InputAdornment,
} from "@mui/material";
import AuthLayout from "../../layout/auth-layout";

export default function SignupCard() {
  return (
    <AuthLayout
      bottomText={
        <>
          Already have an account?{" "}
          <Link href="#" underline="hover">
            Login
          </Link>
        </>
      }
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        Create account
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Let’s get you started sharing your links!
      </Typography>

      {/* Email Field */}
      <TextField
        fullWidth
        label="Email address"
        placeholder="e.g. alex@email.com"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src="/icons/email.png"
                alt="email"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            </InputAdornment>
          ),
        }}
      />

      {/* Create Password */}
      <TextField
        fullWidth
        type="password"
        label="Create password"
        placeholder="At least 8 characters"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src="/icons/lock.png"
                alt="lock"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm Password */}
      <TextField
        fullWidth
        type="password"
        label="Confirm password"
        placeholder="At least 8 characters"
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img
                src="/icons/lock.png"
                alt="lock"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            </InputAdornment>
          ),
        }}
        helperText="Password must contain at least 8 characters"
      />

      {/* Create Account Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "#1976d2",
          textTransform: "none",
          fontWeight: "bold",
          py: 1.5,
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        Create new account
      </Button>

      {/* Google Button */}
      <Button
        variant="outlined"
        fullWidth
        sx={{
          mt: 2,
          textTransform: "none",
          fontWeight: 500,
          py: 1.5,
        }}
        startIcon={
          <img
            src="/icons/google.png"
            alt="google"
            style={{ width: 20, height: 20 }}
          />
        }
      >
        Continue with Google
      </Button>
    </AuthLayout>
  );
}
