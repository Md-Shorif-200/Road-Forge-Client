import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router.jsx';
import AuthProvier from './Context/AuthProvier.jsx';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvier>
           <RouterProvider router={router} />
      </AuthProvier>

      {/* react hot toast */}
      <Toaster></Toaster>
  </StrictMode>,
)
