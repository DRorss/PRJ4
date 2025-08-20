import * as yup from "yup";
import pattern from "./pattern";
import msg from "./message";

const userSchema = yup.object().shape({
  userName: yup.string().required(msg.required),
  fullName: yup.string().required(msg.required),
  password: yup.string().matches(pattern.password, msg.password),
  email: yup.string().required(msg.required).email(msg.email),
  role: yup.string().required(msg.required),
  enabled: yup.string().required(msg.required),
});

export default userSchema;
