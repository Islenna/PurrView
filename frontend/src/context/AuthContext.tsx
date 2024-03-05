import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context value
interface AuthContextType {
    token: string | null;
    login: (authToken: string) => void;
    logout: () => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    // Function to login and set the token
    const login = (authToken: string) => {
        setToken(authToken);
    };

    // Function to logout and clear the token
    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
