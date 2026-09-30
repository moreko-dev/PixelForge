import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { ProjectProvider } from "./contexts/ProjectContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Router from "./routes/Router";
import "./styles/App.css";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ProjectProvider>
      <RouterProvider router={Router} />
      <Toaster
        toastOptions={{
          className: "bg-surface-elevated! text-text!",
          duration: 3000,
        }}
      />
    </ProjectProvider>
  </ThemeProvider>,
);
