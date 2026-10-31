import NotFoundPage from "@src/pages/NotFoundPage.js";
import ProjectsPage from "@src/pages/ProjectsPage.js";
import { createBrowserRouter, type RouteObject } from "react-router";
import EditorPage from "../pages/EditorPage.js";
import HomePage from "../pages/HomePage.js";
import StarterPage from "../pages/StarterPage.js";
import EditorProtection from "./EditorProtection.js";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <StarterPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
    ],
  },
  {
    path: "/editor",
    element: (
      <EditorProtection>
        <EditorPage />
      </EditorProtection>
    ),
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
];

export default createBrowserRouter(routes);
