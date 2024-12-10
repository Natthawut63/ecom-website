import React, { useState, useEffect } from "react";
import useEconStore from "../store/ecom-store";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEconStore((state) => state.user);
  const token = useEconStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then(() => setOk(true))
        .catch(() => setOk(false));
    }
  }, []);
  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
