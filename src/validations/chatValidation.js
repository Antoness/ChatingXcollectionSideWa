import * as Yup from "yup";

export const chatValidation = Yup.object().shape({
  chat: Yup.string().required("Input message!"),
});
