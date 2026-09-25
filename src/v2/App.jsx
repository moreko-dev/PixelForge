import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./App.css";
import Router from "./routes/Router";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router} />,
);
