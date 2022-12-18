import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/authSlice";
import { useRouter } from "next/router";
import store from "../redux/store";
import {
  getAllProduct,
  rehydrate,
} from "../redux/userDashboard/userDashboardSlice";

interface IProps {
  products: [];
}

const Index: React.FC<IProps> = ({ products }) => {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useSelector(selectAuth);

  const redirectHostDashboard = () => {
    if (user.role === "host") {
      router.push(`/hostDashboard/${user.id}`);
    }
  };

  React.useEffect(() => {
    redirectHostDashboard();
    /**
     * rehydrate method updates the products state in
     * the redux store client side.
     */
    store.dispatch(rehydrate(products));
  }, [isLoggedIn]);

  return (
    <div className="container">
      <div className="wrapper">
        {products.map((product: any) => {
          return (
              <p
                key={product._id}
                onClick={() => router.push(`/productDetail/${product._id}`)}
              >
                {product.productName}
              </p>
          );
        })}
      </div>
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  await store.dispatch(getAllProduct());
  return {
    props: {
      products: store.getState().userDashboard.products,
    },
    revalidate: 100
  };
}

