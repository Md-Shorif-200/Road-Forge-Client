import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import ErrorPage from "../Pages/ErrorPage";

import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import Home from "../Pages/Home/Home";
import RoadMapDetails from "../Pages/Road-map-item/RoadMapDetails";

export  const router = createBrowserRouter([
  {
    path: "/",
    errorElement : <ErrorPage></ErrorPage>,
    element : <Mainlayout></Mainlayout>,
    children : [
        {
            path : "/",
            element : <Home></Home>
        },
        {
          path : 'sign-up',
          element : <SignUp></SignUp>
        },
         {
          path : 'log-in',
          element : <LogIn></LogIn>
         },
         {
          path : 'roadmap-details/:id',
          element : <RoadMapDetails></RoadMapDetails>
         }
    ]
  }
]);
