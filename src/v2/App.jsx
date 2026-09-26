import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import "./styles/App.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router} />,
);
