import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

const CustomButton = ({
  children,
  variant = "contained",
  color = "primary",
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ display: "inline-block" }}
    >
      <Button
        variant={variant}
        color={color}
        onClick={onClick}
        sx={{
          borderRadius: "50px",
          padding: "10px 24px",
          fontWeight: 600,
          boxShadow:
            variant === "contained"
              ? "0 4px 14px 0 rgba(255,107,0,0.39)"
              : "none",
          "&:hover": {
            boxShadow:
              variant === "contained"
                ? "0 6px 20px rgba(255,107,0,0.5)"
                : "none",
          },
        }}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default CustomButton;
