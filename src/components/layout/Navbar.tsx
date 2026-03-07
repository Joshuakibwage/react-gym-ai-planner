import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserButton }  from "@neondatabase/neon-js/auth/react";

// icons
import { Dumbbell } from 'lucide-react';

import { useAuth } from "@/context/useAuth";


const Navbar = () => {

  const { user } = useAuth();

  return (
    <header className="w-full py-4 mb-60">
      <div className="max-w-6xl mx-auto px-6 py-6 h-14 flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-2 text-foreground"
        >
          <Dumbbell
            className="w-6 h-6 text-secondary"
          />
          <span className="font-semibold text-xl">Fitness AI</span>
        </Link>

        <nav>
          {
            user ? (
              <>
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <Button variant="ghost" size="sm">My Plan</Button>
                  </Link>

                  <UserButton 
                    size="icon" 
                    className="cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <>
                <Link to="/auth/sign-up">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>

                <Link to="/auth/sign-in">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )
          }
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
