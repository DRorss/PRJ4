import * as yup from "yup";
import msg from "./message";

const emailSchema = yup.object({
  email: yup.string().email(msg.emailInvalid)
    .required(msg.required),
});

export default emailSchema;
