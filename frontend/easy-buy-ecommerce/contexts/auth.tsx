import React from "react";
import { setUser, signOut, unSetUser } from "../redux/auth/authSlice";
import axios from "axios";
import store from "../redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface props {
  children: React.ReactNode;
}
const Auth = ({ children }: props): React.ReactElement => {
  const router = useRouter();

  const verifySession = async () => {
    if (Cookies.get("userCredentials")) {
      try {
        const res = await axios.get("/auth/verifysession");
        if (res.data.status === "success") store.dispatch(setUser());
      } catch (error: any) {
        if (error.response?.data.status === "failure") {
          store.dispatch(unSetUser());
          store.dispatch(signOut());
          router.push("/");
        }
      }
    }
    return;
  };

  React.useEffect(() => {
    verifySession();
  }, []);

  return <>{children}</>;
};

export default Auth;
