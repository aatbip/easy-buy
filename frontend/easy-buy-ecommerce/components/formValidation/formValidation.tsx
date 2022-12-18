import React, { RefObject } from "react";
import { IFormData } from "../../types/types";

interface IValidate {
  formData?: IFormData;
  errors: IFormData;
  nameInput: RefObject<HTMLInputElement> | null;
  emailInput: RefObject<HTMLInputElement> | null;
  passwordInput: RefObject<HTMLInputElement> | null;
  shopNameInput: RefObject<HTMLInputElement> | null;
}

export interface IFormContext extends IValidate {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormContext = React.createContext<IFormContext | null>(null);

/**
 * validate function that takes the form data and
 * returns error.
 */
const validate = ({
  formData,
  errors,
  nameInput,
  emailInput,
  passwordInput,
  shopNameInput,
}: IValidate): IFormData => {
  if (!formData) {
    return errors;
  }

  if (
    emailInput == null ||
    nameInput == null ||
    passwordInput == null ||
    shopNameInput == null
  ) {
    return formData;
  }

  if (
    document.activeElement == emailInput.current ||
    document.activeElement == passwordInput.current ||
    document.activeElement == nameInput.current
  ) {
    if (!formData.name) {
      errors = { ...errors, name: "Required" };
    } else if (formData.name.length >= 50) {
      errors = { ...errors, name: "Must be 50 characters or less" };
    } else {
      errors = { ...errors, name: "" };
    }
  }

  if (
    document.activeElement == passwordInput.current ||
    document.activeElement == emailInput.current
  ) {
    if (!formData.email) {
      errors = { ...errors, email: "Required" };
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      errors = { ...errors, email: "Invalid email address" };
    } else {
      errors = { ...errors, email: "" };
    }
  }

  if (
    document.activeElement == passwordInput.current ||
    document.activeElement == shopNameInput.current
  ) {
    if (!formData.password) {
      errors = { ...errors, password: "Required" };
    } else if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
        formData.password
      )
    ) {
      errors = {
        ...errors,
        password:
          "Password should contain minimum 8 minimum 30 characters, one uppercase letter, one lowercase letter, one number and one special character!",
      };
    } else {
      errors = { ...errors, password: "" };
    }
  }

  if (document.activeElement == shopNameInput.current) {
    if (!formData.shopName) {
      errors = { ...errors, shopName: "Required" };
    } else if (formData.shopName.length >= 50) {
      errors = { ...errors, shopName: "Must be 50 characters or less" };
    } else {
      errors = { ...errors, shopName: "" };
    }
  }

  return errors;
};

/**
 * HOC to validate form.
 */

interface Props {
  children: React.ReactNode;
}

export const FormValidationComponent: React.FC<Props> = ({ children }) => {
  const [formData, setFormData] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });

  const [errors, setErrors] = React.useState<IFormData>({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const nameInput = React.useRef<HTMLInputElement>(null);
  const emailInput = React.useRef<HTMLInputElement>(null);
  const passwordInput = React.useRef<HTMLInputElement>(null);
  const shopNameInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const updatedError = validate({
      formData,
      errors,
      nameInput,
      emailInput,
      passwordInput,
      shopNameInput,
    });
    setErrors(updatedError);
  }, [formData]);

  return (
    <FormContext.Provider
      value={{
        nameInput,
        emailInput,
        passwordInput,
        shopNameInput,
        handleInput,
        errors,
        formData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
