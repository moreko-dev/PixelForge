import { createBrowserRouter, type RouteObject } from "react-router";
import EditorPage from "../pages/EditorPage.js";
import StarterPage from "../pages/StarterPage.js";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <StarterPage />,
      },
      {
        path: "/editor",
        element: <EditorPage />,
      },
    ],
  },
  {
    path: "/*",
    element: <>404: ROUTE_NOT_FOUND</>,
  },
];

export default createBrowserRouter(routes);
