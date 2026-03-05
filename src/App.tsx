 import React from 'react';
 import { BrowserRouter , Routes, Route } from 'react-router-dom';
 import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from './lib/auth';
import AuthProvider from './context/AuthContext';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Onboarding from "./pages/Onboarding";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/Footer";


 const App = () => {
   return (
    <NeonAuthUIProvider emailOTP authClient={authClient} defaultTheme="dark">
      <AuthProvider>
        <BrowserRouter>

          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route index  element={<Home />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/:pathname" element={<Auth />} />
                <Route path="/account/:pathname" element={<Account />} />
              </Routes>
            </main>
            <Footer />
          </div>

        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
    
   )
 }
 
 export default App
 