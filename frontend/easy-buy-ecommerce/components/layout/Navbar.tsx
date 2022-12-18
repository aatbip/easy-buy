import React, { use } from "react";
import { useRouter } from "next/router";
import HamburgerMenu from "../hamburger/HamburgerMenu";
import { IHamburgerItems } from "../../types/types";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";

interface IProp {
  hamburgerItems: Array<IHamburgerItems> | null;
}

const Navbar: React.FC<IProp> = ({ hamburgerItems }) => {
  const router = useRouter();
  const { user } = useSelector(selectAuth);

  return (
    <div style={{ padding: "20px 0px" }} className="container layout-gradient">
      <div className="wrapper flex-row-nowrap ">
        <h2
          onClick={() => {
            user.role === "user"
              ? router.push("/")
              : router.push(`/hostDashboard/${user.id}`);
          }}
          style={{ color: "#fff", cursor: "pointer" }}
        >
          <i>EASY BUY</i>
        </h2>
        <HamburgerMenu hamburgerItems={hamburgerItems} />
      </div>
    </div>
  );
};

export default Navbar;
