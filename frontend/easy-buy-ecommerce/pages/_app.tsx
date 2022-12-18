import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Provider, useSelector } from "react-redux";
import store from "../redux/store";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

import { GetHamburgerProps } from "../contexts/getHamburgerProps";
import Auth from "../contexts/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GetHamburgerProps>
        <Auth>
          <Layout>
            <Component {...pageProps} />
            <Toaster
              toastOptions={{
                duration: 1500,
              }}
            />
          </Layout>
        </Auth>
      </GetHamburgerProps>
    </Provider>
  );
}
