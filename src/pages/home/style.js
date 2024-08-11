/* eslint-disable no-unused-vars */
import { Button, Stack, styled } from "@mui/material";

export const CustomHomeStack = styled(Stack)(({ theme }) => ({
  padding: 10,
  gap: "10px",
  alignItems: "start",
}));

export const StyledHomeButton = styled(Button)(({ theme }) => ({
  color: "red",
  backgroundColor: theme.palette.success.dark,
  ":hover": {
    backgroundColor: theme.palette.success.main,
  },
}));
