import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={client}>
      <App />
      <CssBaseline />
    </QueryClientProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
