import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUser, logout } from "@/store/slices/authSlice";
import api from "@/services/axios";

const AuthBootstrap = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token && !user) {
      api
        .get("/auth/user")
        .then(({ data }) => dispatch(setUser(data)))
        .catch(() => dispatch(logout()));
    }
  }, [token, user, dispatch]);

  return null;
};

export default AuthBootstrap;
