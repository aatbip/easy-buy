import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/authSlice";
import { IHamburgerItems } from "../types/types";
interface Props {
  children: React.ReactNode;
}

export const HamburgerContext = React.createContext<any>(null);

export const GetHamburgerProps: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, user } = useSelector(selectAuth);
  const [hamburgerItems, setHamburgerItems] = React.useState<IHamburgerItems[]>(
    []
  );

  React.useEffect(() => {
    if (!isLoggedIn) {
      setHamburgerItems([
        {
          name: "LOGIN",
          path: "/login",
        },
        {
          name: "BECOME HOST",
          path: "/register/host",
        },
      ]);
    } else if (isLoggedIn && user.role === "host") {
      setHamburgerItems([
        {
          name: "MANAGE PRODUCTS",
          path: "/manage-products",
        },
        {
          name: "MANAGE ORDERS",
          path: "/manage-orders",
        },
        {
          name: "LOGOUT",
          path: "/logout",
        },
      ]);
    } else if (isLoggedIn && user.role === "user") {
      setHamburgerItems([
        {
          name: "MY CART",
          path: "/cart",
        },
        {
          name: "MY ORDERS",
          path: "/order",
        },
        {
          name: "LOGOUT",
          path: "/logout",
        },
      ]);
    }
  }, [isLoggedIn, user]);

  return (
    <HamburgerContext.Provider
      value={{
        hamburgerItems,
      }}
    >
      {children}
    </HamburgerContext.Provider>
  );
};
