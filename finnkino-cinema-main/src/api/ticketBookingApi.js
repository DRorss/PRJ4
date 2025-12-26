import axiosClient from "./config/axiosClient";

const resourceName = "api/booking";
const resourceNameFilm = "api/film";

const ticketBookingApi = {
  bookTicket: (ticket) => {
    const url = resourceName;
    return axiosClient.post(url, ticket);
  },
  getTicketOfficeList: (id) => {
    const url = resourceNameFilm + `/getDetail/${id}`;
    return axiosClient.get(url);
  },
  createShowtime: (showtime) => {
    const url = resourceName + "TaoLichChieu";
    return axiosClient.post(url, showtime);
  },
  reportBookings: () => {
    const url = resourceName + "/report-bookings";
    return axiosClient.get(url);
  },
};

export default ticketBookingApi;
