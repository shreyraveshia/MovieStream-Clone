import React, { StrictMode } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>  

      <App />

    </BrowserRouter>
{/* // BrowserRouter will help us to use the routing in our app.
// Now we will get the support of this react router in this app component. */}
  </React.StrictMode>,
)
