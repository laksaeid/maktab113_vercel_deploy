import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <Container fixed>
      <Header />
      <Outlet />
    </Container>
  );
};

export default Layout;
