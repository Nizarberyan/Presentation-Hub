import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { loginService, registerService } from "../services/suth.service";
import type { User } from "../types/User.type";
const roles = ["admin", "teacher", "student"];

type Credentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: (typeof roles)[number];
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  setAuth: (user: User, token: string) => void;
};

const STORAGE_USER = "auth:user";
const STORAGE_TOKEN = "auth:token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_USER);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_TOKEN),
  );

  const [loading, setLoading] = useState<boolean>(false);

  const isLoggedIn = Boolean(user && token);

  const persist = (u: User | null, t: string | null) => {
    if (u && t) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(u));
      localStorage.setItem(STORAGE_TOKEN, t);
    } else {
      localStorage.removeItem(STORAGE_USER);
      localStorage.removeItem(STORAGE_TOKEN);
    }
  };

  const setAuth = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
    persist(newUser, newToken);
  };

  const login = async (credentials: Credentials) => {
    setLoading(true);
    try {
      const response = await loginService(credentials);
      setAuth(response.user, response.token);
    } catch (error) {
      throw error; // Let the caller handle the error
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await registerService(data);
      setAuth(response.user, response.token);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persist(null, null);
  };

  // Optional: Validate token on mount
  useEffect(() => {
    // If you have a token validation endpoint:
    // const validateToken = async () => {
    //     if (token) {
    //         try {
    //             await validateTokenService(token);
    //         } catch {
    //             logout();
    //         }
    //     }
    // };
    // validateToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn,
        login,
        register,
        logout,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
