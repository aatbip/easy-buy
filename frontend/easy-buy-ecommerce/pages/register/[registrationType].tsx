import React, { useContext } from "react";

import { register, selectAuth } from "../../redux/auth/authSlice";
import styles from "../../styles/Form.module.css";

import {
  FormContext,
  FormValidationComponent,
} from "../../components/formValidation/formValidation";
import store from "../../redux/store";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const RegistrationForm: React.FC = () => {
  const props = useContext(FormContext);
  const router = useRouter();
  const { response } = useSelector(selectAuth);

  const { registrationType } = router.query;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (registrationType === "user") {
      if (props?.errors.email || props?.errors.name || props?.errors.password)
        return;

      if (
        !props?.formData?.email ||
        !props.formData.name ||
        !props.formData.password
      ) {
        toast.error("Please enter all credentials!");
        return;
      }

      store.dispatch(register({ ...props.formData, role: "user" }));
    }

    if (registrationType === "host") {
      if (
        props?.errors.email ||
        props?.errors.name ||
        props?.errors.password ||
        props?.errors.shopName
      )
        return;

      if (
        !props?.formData?.email ||
        !props.formData.name ||
        !props.formData.password ||
        !props.formData.shopName
      ) {
        toast.error("Please enter all credentials!");
        return;
      }

      store.dispatch(register({ ...props.formData, role: "host" }));
    }
  };

  React.useEffect(() => {
    response === "success" && router.push("/login");
  }, [response]);

  return (
    <>
      <div
        style={{ marginTop: "50px", minHeight: "90vh" }}
        className="container"
      >
        <div className="wrapper">
          {props && (
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              {registrationType === "user" ? (
                <h1 style={{ textAlign: "center" }}>Register</h1>
              ) : (
                <h1 style={{ textAlign: "center" }}>Become Host and Sell</h1>
              )}
              {registrationType === "user" ? (
                <label htmlFor="name">Name</label>
              ) : (
                <label htmlFor="name">Your Name</label>
              )}
              <input
                type="text"
                id="name"
                name="name"
                className={props.errors.name ? "error-input-box" : ""}
                ref={props.nameInput}
                onChange={(e) => props.handleInput(e)}
              />
              {props.errors.name && (
                <p className="error-text">{props.errors.name}</p>
              )}
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={props.errors.email ? "error-input-box" : ""}
                ref={props.emailInput}
                onChange={(e) => props.handleInput(e)}
              />
              {props.errors.email && (
                <p className="error-text">{props.errors.email}</p>
              )}

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={props.errors.password ? "error-input-box" : ""}
                ref={props.passwordInput}
                onChange={(e) => props.handleInput(e)}
              />
              {props.errors.password && (
                <p className="error-text">{props.errors.password}</p>
              )}

              {registrationType === "host" && (
                <>
                  <label htmlFor="shopName">Shop Name</label>
                  <input
                    type="text"
                    id="shopName"
                    name="shopName"
                    className={props.errors.shopName ? "error-input-box" : ""}
                    ref={props.shopNameInput}
                    onChange={(e) => props.handleInput(e)}
                  />
                  {props.errors.shopName && (
                    <p className="error-text">{props.errors.shopName}</p>
                  )}
                </>
              )}

              <button className={styles.formButton} type="submit">
                Register!
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

const Index: React.FC = () => {
  return (
    <FormValidationComponent>
      <RegistrationForm />
    </FormValidationComponent>
  );
};

export default Index;
