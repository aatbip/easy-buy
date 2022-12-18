import { responseMessage } from "../interfaces/responseMessage.interface";

const success = <T>(data: T): responseMessage<T> => {
  return {
    status: "success",
    data: data,
  };
};

const failure = <T>(data: T): responseMessage<T> => {
  return {
    status: "failure",
    data: data,
  };
};

export { success, failure };
