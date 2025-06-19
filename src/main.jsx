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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvier>
        {/* tanstack Query */}
          <QueryClientProvider client={queryClient} >

           <RouterProvider router={router} />
          </QueryClientProvider>
      </AuthProvier>

      {/* react hot toast */}
      <Toaster></Toaster>
  </StrictMode>,
)
