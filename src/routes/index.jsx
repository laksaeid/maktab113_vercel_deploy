/* eslint-disable react/prop-types */
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Products from "../pages/products";
import Layout from "../components/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <Link to="/">Go Home</Link>
      </div>
    ),
  },
]);

export const AppRoutes = ({ children }) => {
  return <RouterProvider router={router}>{children}</RouterProvider>;
};
