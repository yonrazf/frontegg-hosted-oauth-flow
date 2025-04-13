import { RouteObject } from "react-router-dom";
import Main from "../components/Main";
import { OAuthCallback } from "../pages/OAuthCallback";
import App from "../App";

const routes: RouteObject[] = [
  {
    path: "/*",
    element: <App />,
    children: [
      { path: "oauth/callback", element: <OAuthCallback /> },
      { path: "*", element: <Main /> },
    ],
  },
];

export default routes;
