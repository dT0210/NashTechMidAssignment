import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: {
    name: "",
    id: "",
    role: 0,
    email: "",
  },
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [user, setUser] = useState({
    username: "",
    id: "",
    email: "",
    role: "Normal",
  });

  useEffect(() => {
    if (token) {
      var decodedToken = jwtDecode(token);
      setUser({
        username:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        id: decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        email:
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
        role: decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
      });
    } else {
      setUser({
        username: "",
        id: "",
        email: "",
        role: "Normal",
      });
    }
  }, [isAuthenticated, token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
