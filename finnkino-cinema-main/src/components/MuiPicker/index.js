import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function MuiDatePicker({ value, onChange, views, format }) {
  return (
    <DatePicker
      value={value}
      views={views || ['year', 'month', 'day']}
      format={format || "DD/MM/YYYY"}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
