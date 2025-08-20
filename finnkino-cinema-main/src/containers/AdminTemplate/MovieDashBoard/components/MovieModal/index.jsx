import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//moment
import moment from "moment";

//formik
import { Formik, useFormik } from "formik";

import { editMovieSchema, addMovieSchema } from "@/validators";
import { actFetchMovieEdit, actFetchMovieAdd } from "@/store/actions/movieManagement";
import actFetchMovieDetails from "@/store/actions/movieDetails";
import { GROUP_ID } from "@/constants";
import dayjs from 'dayjs';

// Material UI
import {
  Box,
  Typography,
  Modal,
  FormControl,
  TextField,
  FormLabel,
  Switch,
  FormHelperText,
  Rating,
  Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Button
} from "@mui/material";
import MuiDatePicker from "@/components/MuiPicker";

//Components
import Loader from "@/components/Loader";
import { SubmitButton } from "../../../components/Buttons";
import Image from "@/components/Image";

//Others
import "./style.scss";
import { movieApi } from "@/api";
import { useNotification } from '../../../../../components/Notification/index';

import msg from '../../../../../validators/message';
import { requestFormReset } from "react-dom";


function MovieModal(props) {
  const { showNotification } = useNotification();
  const { openModalMovie, setOpenModalMovie, title, button, data, loading, movieId, modalType } =
    props;
  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();
  const handleClose = () => setOpenModalMovie(false);

  const initialValuesAddMovie = {
    name: "",
    author: "",
    showTime: null,
    type: "",
    productionDate: null,
    volumnFilm: "",
    desc: "",
    showHideFilm: true,
    image: "",
  };

  const initialValuesEditMovie = {
    name: data?.name,
    author: data?.author,
    showTime: data?.showTime,
    type: data?.type,
    productionDate: data?.productionTime,
    volumnFilm: data?.volumnFilm,
    desc: data?.description,
    showHideFilm: data?.showHideFilm,
    image: data?.image
  };

  let movieSchema = modalType === "addMovie" ? addMovieSchema : editMovieSchema;

  const fetchMovieAdd = async (formData, movieId) => {
    try {
      await movieApi.save(formData);
      setOpenModalMovie(false);
      showNotification(msg.sucess);
    } catch (error) {
      showNotification(msg.create_error, 'error');
    }
  };

  const fetchMovieEdit = async (formData) => {
    try {
      await movieApi.save(formData);
      setOpenModalMovie(false);
      // showNotification(msg.update_success);
      document.location.reload();
    } catch (error) {
      showNotification(msg.update_error, 'error');
    }
  };

  const { errors, values, touched, setFieldValue, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: modalType === "addMovie" ? initialValuesAddMovie : initialValuesEditMovie,
      validationSchema: movieSchema,
      onSubmit: (values) => {
        let formData = new FormData();

        formData.append('name', values.name);
        formData.append('author', values.author);
        formData.append('showTime', modalType === "editMovie" ? new Date(values.showTime) : values.showTime);
        formData.append('type', values.type);
        formData.append('productionDate', values.productionDate);
        formData.append('volumnFilm', values.volumnFilm);
        formData.append('desc', values.desc);
        formData.append('showHideFilm', values.showHideFilm);
        if (values.image) formData.append('image', values.image);

        if (modalType === "addMovie") {
          fetchMovieAdd(formData);
        } else if (modalType === "editMovie") {
          formData.append('id', movieId);
          fetchMovieEdit(formData);
        }
      },
    });

  useEffect(() => {
    resetForm();
  }, []);

  useEffect(() => {
    if (movieId) {
      dispatch(actFetchMovieDetails(movieId));
    }
  }, [movieId]);

  const resetForm = () => {
    setFieldValue("name", '');
    setFieldValue("author", '');
    setFieldValue("showTime", '');
    setFieldValue("type", '');
    setFieldValue("productionDate", '');
    setFieldValue("volumnFilm", '');
    setFieldValue("desc", '');
    setFieldValue("showHideFilm", true);
    setFieldValue("image", '');
  }

  const handleChangeDatePicker = (date) => {
    setFieldValue("showTime", date);
  };

  const handleChangeProductionDate = (date) => {
    if (date && moment.isMoment(date)) {
      setFieldValue("productionDate", date.format("YYYY"));
    } else if (date instanceof Date) {
      setFieldValue("productionDate", moment(date).format("YYYY"));
    } else {
      setFieldValue("productionDate", "");
    }
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      setFieldValue(name, value.target.checked);
    };
  };

  const handleChangeNumberInput = (name) => {
    return (value) => {
      setFieldValue(name, value.target.value);
    };
  };

  const handleChangeFile = (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };

      setFieldValue("image", file);
    }
  };

  return (
    <Dialog open={openModalMovie} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      {loading ? (
        <Loader />
      ) : (
        <Formik>
          <DialogContent sx={{ paddingBottom: 0 }}>
            <Box sx={{ mt: 2 }} component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-name">
                  Tên phim
                </FormLabel>
                <TextField
                  name="name"
                  id="name"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={errors.name && touched.name ? true : false}
                />
                {errors.name && touched.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-name">
                  Tác giả
                </FormLabel>
                <TextField
                  name="author"
                  id="author"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  error={errors.author && touched.author ? true : false}
                />
                {errors.author && touched.author && (
                  <FormHelperText error>{errors.author}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel
                  className="movie-form__input-label"
                  htmlFor="movie-release-date"
                  sx={{ mr: 1 }}
                >
                  Ngày khởi chiếu
                </FormLabel>

                <MuiDatePicker
                  name="showTime"
                  style={{ width: "fit-content" }}
                  onChange={handleChangeDatePicker}
                  onBlur={handleBlur}
                  inputFormat={"DD/MM/YYYY"}
                  value={values.showTime || null}
                />
                {errors.showTime && touched.showTime && (
                  <FormHelperText error>{errors.showTime}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-trailer">
                  Thể loại
                </FormLabel>
                <TextField
                  name="type"
                  value={values.type}
                  id="type"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.type && touched.type ? true : false}
                />
                {errors.type && touched.type && (
                  <FormHelperText error>{errors.type}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-trailer">
                  Năm sản xuất
                </FormLabel>
                <MuiDatePicker
                  name="productionDate"
                  style={{ width: "fit-content" }}
                  onChange={handleChangeProductionDate}
                  onBlur={handleBlur}
                  views={['year']}
                  format={"YYYY"}
                  value={values.productionDate || null}
                  slotProps={{
                    textField: { fullWidth: true },
                  }}
                />
                {errors.productionDate && touched.productionDate && (
                  <FormHelperText error>{errors.productionDate}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-trailer">
                  Thời lượng phim
                </FormLabel>
                <TextField
                  name="volumnFilm"
                  value={values.volumnFilm}
                  id="volumnFilm"
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.volumnFilm && touched.volumnFilm ? true : false}
                />
                {errors.volumnFilm && touched.volumnFilm && (
                  <FormHelperText error>{errors.volumnFilm}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-desc">
                  Mô tả
                </FormLabel>
                <TextField
                  name="desc"
                  value={values.desc}
                  id="desc"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.desc && touched.desc ? true : false}
                />
                {errors.desc && touched.desc && (
                  <FormHelperText error>{errors.desc}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth className="form__input-wrapper">
                <FormLabel className="movie-form__input-label" htmlFor="movie-desc">
                  Hiện/Ẩn phim
                </FormLabel>
                <Switch name="showHideFilm" defaultChecked />
                {errors.showHideFilm && touched.showHideFilm && (
                  <FormHelperText error>{errors.showHideFilm}</FormHelperText>
                )}
              </FormControl>
              <FormControl className="form__input-wrapper">
                <Box sx={{ flexDirection: "row" }}>
                  <FormLabel className="movie-form__input-label" htmlFor="movie-img" sx={{ mr: 1 }}>
                    Hình ảnh
                  </FormLabel>
                  <input
                    name="image"
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/png"
                    onChange={handleChangeFile}
                    onBlur={handleBlur}
                  />
                </Box>
                {/* {errors.image && touched.image && (
                  <FormHelperText error sx={{ my: 1 }}>
                    {errors.image}
                  </FormHelperText>
                )} */}
                <Image
                  src={imgSrc === null && modalType === "editMovie" ? data?.image : imgSrc}
                  alt="..."
                  className="modal__img"
                />
              </FormControl>
              <Box sx={{ paddingBottom: 2 }}>
                <SubmitButton>{button}</SubmitButton>
              </Box>
            </Box>
          </DialogContent>
        </Formik>
      )}
    </Dialog>
  );
}

export default MovieModal;
