import React, { useState, useEffect } from "react";
import useEconStore from "../store/ecom-store";
import { currentAdmin } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteAdmin = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEconStore((state) => state.user);
  const token = useEconStore((state) => state.token);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then((res) => {
          setOk(true);
          return ok ? element : <LoadingToRedirect />;
        })
        .catch((err) => {
          setOk(false);
        });
    }
  }, []);

  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteAdmin;
