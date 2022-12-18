import React from "react";
import { getAdminProduct } from "../../redux/hostDashboard/hostDashboardSlice";
import store from "../../redux/store";

const HostProductDetail = ({ data }:any) => {
  console.log("new", data);
  return <div>HostProductDetail</div>;
};

export default HostProductDetail;

export async function getServerSideProps(context: any) {
  const { req, res } = context;

  await store.dispatch(getAdminProduct());

  return {
    props: {
      data: store.getState().hostDashboard.hostProduct,
    },
  };
}
