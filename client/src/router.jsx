import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/AppLayout.jsx";

import Home from "./pages/Home.jsx";
import Analysis from "./pages/Analysis.jsx";
import Predictions from "./pages/Predictions.jsx";
import About from "./pages/About.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "analysis", element: <Analysis /> },
      { path: "predictions", element: <Predictions /> },
      { path: "about", element: <About /> },
    ],
  },
]);
