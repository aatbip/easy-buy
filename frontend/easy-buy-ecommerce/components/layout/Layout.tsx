import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import {
  HamburgerContext,
} from "../../contexts/getHamburgerProps";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { hamburgerItems } = React.useContext(HamburgerContext);

  return (
    <>
      <Navbar hamburgerItems={hamburgerItems} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
