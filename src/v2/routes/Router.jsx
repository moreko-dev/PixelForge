import { createBrowserRouter } from "react-router";
import EditorLayout from "../layout/EditorLayout";
import StarterLayout from "../layout/StarterLayout";
import CloudPage from "../pages/CloudPage";
import EditorPage from "../pages/EditorPage";
import HomePage from "../pages/HomePage";
import ProjectsPage from "../pages/ProjectsPage";
import TemplatesPage from "../pages/TemplatesPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <StarterLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/templates", element: <TemplatesPage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/cloud", element: <CloudPage /> },
    ],
  },
  {
    path: "/editor",
    element: <EditorLayout />,
    children: [{ index: true, element: <EditorPage /> }],
  },
]);

export default Router;
