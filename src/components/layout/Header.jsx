/* eslint-disable react/prop-types */
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
const routes = [
  { href: "/", text: "Home" },
  { href: "/products", text: "Products" },
];
const Header = () => {
  return (
    <Stack
      bgcolor={"yellowgreen"}
      p={2}
      direction={"row"}
      borderRadius={"0 0 10px 10px"}
      boxShadow={"0 0 10px black"}
      gap={2}
    >
      {routes.map((route) => (
        <StyledLink key={route.href} href={route.href}>
          {route.text}
        </StyledLink>
      ))}
    </Stack>
  );
};

export default Header;

const StyledLink = ({ href, children }) => {
  const navigate = useNavigate();
  return (
    <Button color="warning" onClick={() => navigate(href)}>
      {children}
    </Button>
  );
};
