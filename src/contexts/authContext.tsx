import React, { createContext, useState, useEffect, ReactNode } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  role: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  console.log("Worood "+role)

  // Check localStorage or sessionStorage for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, role: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role); // Store role
      
    } else {
      sessionStorage.setItem("authToken", token);
      sessionStorage.setItem("userRole", role); // Store role
    }
    setIsAuthenticated(true);
    setRole(role); // Update role in context state
  };
  

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setRole(null);
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
