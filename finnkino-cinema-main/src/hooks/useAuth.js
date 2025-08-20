import { useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("infoUser")));

  const login = (user) => {
    sessionStorage.setItem("infoUser", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem("infoUser");
    setUser({});
  };

  return { user, login, logout };
};

export default useAuth;
