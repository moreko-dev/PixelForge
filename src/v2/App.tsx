import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import Router from "./routes/Router.js";
import "./styles/App.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={Router} />
    <Toaster
      containerStyle={{
        zIndex: 9999999,
      }}
      toastOptions={{
        className:
          "bg-toast! text-toast-foreground! border! border-toast-border! shadow! shadow-toast-shadow!",
      }}
      position="bottom-left"
    />
  </ThemeProvider>,
);
