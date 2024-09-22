import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
  setIsAuthenticated:any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize loading state

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true); // Start loading

      try {
        const response = await axios.get<{ isAuthenticated: boolean }>('/user/check', { withCredentials: true });
        console.log('Auth check response:', response.data);
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false); // Set to false on error
      } finally {
        setIsLoading(false); // Set loading to false once check is done
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
