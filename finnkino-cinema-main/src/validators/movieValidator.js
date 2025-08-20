import * as yup from "yup";
import pattern from "./pattern";
import msg from "./message";

const editMovieSchema = yup.object({
  name: yup.string().required(msg.required),
  author: yup.string().required(msg.required),
  showTime: yup.string().required(msg.required),
  type: yup.string().required(msg.required),
  productionDate: yup.string().required(msg.required),
  volumnFilm: yup.number().required(msg.required),
  desc: yup.string().required(msg.required),
  showHideFilm: yup.boolean().required(msg.required),
});

const addMovieSchema = yup.object({
  name: yup.string().required(msg.required),
  author: yup.string().required(msg.required),
  showTime: yup.string().required(msg.required),
  type: yup.string().required(msg.required),
  productionDate: yup.string().required(msg.required),
  volumnFilm: yup.number().required(msg.required),
  desc: yup.string().required(msg.required),
  showHideFilm: yup.boolean().required(msg.required),
  image: yup.mixed().required(msg.required),
});

export { editMovieSchema, addMovieSchema };
