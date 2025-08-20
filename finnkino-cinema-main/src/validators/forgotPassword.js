import * as yup from "yup";
import msg from "./message";
import pattern from "./pattern/index";
const forgotPasswordSchema = yup.object({

  email: yup.string().email(msg.emailInvalid)
    .required(msg.required),
  newPassword: yup.string()
    .required(msg.required)
    .matches(pattern.password, msg.password),
  reNewPassword: yup.string()
    .required(msg.required)
    .oneOf([yup.ref('newPassword')], msg.confirmedPassword),
});

export default forgotPasswordSchema;
