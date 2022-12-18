import React, { useContext } from "react";
import Link from "next/link";
import styles from "../../styles/Form.module.css";
import toast from "react-hot-toast";
import store from "../../redux/store";

import {
  FormContext,
  FormValidationComponent,
} from "../../components/formValidation/formValidation";
import { login, selectAuth } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const LoginForm: React.FC = () => {
  const props = useContext(FormContext);
  const router = useRouter();
  const { user } = useSelector(selectAuth);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (props?.errors.email || props?.errors.password) return;

    if (!props?.formData?.email || !props.formData.password) {
      toast.error("Please enter all credentials!");
      return;
    }

    store.dispatch(
      login({
        email: props.formData.email,
        password: props.formData.password,
      })
    );

 
  };

  React.useEffect(() => {
    user.role === "user" && router.push("/");
    user.role === "host" && router.push(`/hostDashboard/${user.id}`);
  }, [user]);

  return (
    <div style={{ marginTop: "50px", minHeight: "90vh" }} className="container">
      <div className="wrapper">
        {props && (
          <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
            <h1 style={{ textAlign: "center" }}>Login</h1>
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

            <button className={styles.formButton} type="submit">
              Login
            </button>
            <p style={{ textAlign: "center" }}>
              Dont have account? <Link href="/register/user">Register!</Link>{" "}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <FormValidationComponent>
      <LoginForm />
    </FormValidationComponent>
  );
};

export default Index;
