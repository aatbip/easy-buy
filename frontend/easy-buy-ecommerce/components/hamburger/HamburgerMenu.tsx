import React from "react";
import styles from "../../styles/Navbar.module.css";
import Hamburger from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { IHamburgerItems } from "../../types/types";
import store from "../../redux/store";
import { signOut, unSetUser } from "../../redux/auth/authSlice";
import { toast } from "react-hot-toast";

interface HamburgerProps {
  hamburgerItems: Array<IHamburgerItems> | null;
}

const HamburgerMenu: React.FC<HamburgerProps> = ({ hamburgerItems }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const router = useRouter();

  const handleClick = (path: string) => {
    if (path === "/logout") {
      store.dispatch(unSetUser());
      store.dispatch(signOut());
      router.push("/");
      toast.success("You are logged out!")
    } else {
      router.push(`${path}`);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className={styles.hamburgerIcon}>
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} color="#fff" />
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.wrapper}
            initial={{ y: -100, x: -100, opacity: 0 }}
            animate={{ y: 20, x: -150, opacity: 1 }}
            exit={{ y: -100, x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {hamburgerItems &&
              hamburgerItems.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      handleClick(item.path);
                      setIsMenuOpen((prev) => !prev);
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HamburgerMenu;
