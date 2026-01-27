// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
// import '@neondatabase/neon-js/ui/css';
// import "./index.css";
// import { authClient } from './lib/auth';
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//    <NeonAuthUIProvider emailOTP authClient={authClient}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </NeonAuthUIProvider>
    
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);


