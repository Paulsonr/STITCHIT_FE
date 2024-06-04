"use client";

import React, { useState } from "react";
//components
import Login from "@/components/login";
import Register from "@/components/register";

const LandingPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div

      className="flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-950 absolute left-3/10 inset-0 -z-10"
      // style={{ height: "inherit" }}
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {isRegistering ? <Register /> : <Login />}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 underline"
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
