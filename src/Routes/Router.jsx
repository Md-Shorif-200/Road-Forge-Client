import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";

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
        }
    ]
  }
]);
