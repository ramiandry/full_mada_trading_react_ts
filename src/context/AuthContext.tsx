import { createContext, ReactNode, useState } from "react";
interface AuthContextProps {
  children: ReactNode;
}

interface Account {
  id: string;
  value: string;
}
export interface AuthContextValue {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  account: Account;
  setValueAccount: (value: Account) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(true);
  const [account, setAccount] = useState<Account>({ id: "", value: "" });

  const login = () => {
    console.log("Logging in...");
    setLoggedIn(true);
  };

  const logout = () => {
    console.log("Logging out...");
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("islogin");
    localStorage.removeItem("user");
  };

  const setValueAccount = (value: Account) => {
    setAccount(value);
  };

  const contextValue: AuthContextValue = {
    isLoggedIn,
    login,
    logout,
    account,
    setValueAccount,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
