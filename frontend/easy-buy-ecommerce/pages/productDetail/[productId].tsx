import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import {
  getAllProduct,
} from "../../redux/userDashboard/userDashboardSlice";
import store from "../../redux/store";

interface IProps {
  product: any;
}

const ProductDetail: React.FC<IProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <div>{product.productDetail}</div>
    </>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  await store.dispatch(getAllProduct());

  const products = await store.getState().userDashboard.products;

  const paths = products.map((product: any) => {
    return {
      params: {
        productId: `${product._id}`,
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const res = await axios.get(`/product/${params.productId}`);

  return {
    props: {
      product: res.data.data,
    },
    revalidate: 30,
  };
}
