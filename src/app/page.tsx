"use client";

import React from "react";
import LandingPage from "@/components/landing";
import { AuthProvider } from "@/context/AuthContext";

const HomePage = () => {
  return (
    <AuthProvider>
      <div className="home_container">
        <LandingPage />
      </div>
    </AuthProvider>
  );
};

export default HomePage;
