import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider, /* useAuth */ } from './context/auth-context';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      < RouterProvider router={App} />
    </AuthProvider>
  </React.StrictMode>,
)
