import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/authSlice";
import {
  getAdminProduct,
  selectHostDashboard,
} from "../../redux/hostDashboard/hostDashboardSlice";
import store from "../../redux/store";

const HostDashboard: React.FC = ({ data }: any) => {
  const { user } = useSelector(selectAuth);
  console.log(data);
  return (
    <div className="container">
      <div className="wrapper">
        <div>HI! {user.shopName} </div>
      </div>
    </div>
  );
};

export default HostDashboard;

export async function getServerSideProps(context: any) {
  const { req, res } = context;
  
  const accessToken = JSON.parse(req.cookies.userCredentials).accessToken;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios.defaults.withCredentials = true;
  

  await store.dispatch(getAdminProduct());
  return {
    props: {
      data: store.getState().hostDashboard.hostProduct,
    },
  };
}
