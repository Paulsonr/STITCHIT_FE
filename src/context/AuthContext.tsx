"use client";

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/user");
        const data = await response.json();
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    setUser(data.user);
    router.push("/");
  };

  const register = async (registerData: any) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      registerData
    );
    setUser(data.user);
    router.push("/");
  };

  const logout = async () => {
    await axios.get("http://localhost:5000/api/auth/logout");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

