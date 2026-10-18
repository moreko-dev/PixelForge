import { createBrowserRouter, type RouteObject } from "react-router";
import EditorPage from "../pages/EditorPage.js";
import HomePage from "../pages/HomePage.js";
import StarterPage from "../pages/StarterPage.js";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <StarterPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/editor",
    element: <EditorPage />,
  },
  {
    path: "/*",
    element: <>404: ROUTE_NOT_FOUND</>,
  },
];

export default createBrowserRouter(routes);
