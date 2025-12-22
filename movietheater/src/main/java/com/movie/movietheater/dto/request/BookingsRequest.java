package com.movie.movietheater.dto.request;

import com.movie.movietheater.entity.Bookings;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BookingsRequest {
    private String id;
    private String userId;
    private String movieId;
    private String movieName;
    private String volumnFilm;
    private String userName;
    private String status;
    private BigDecimal totalPrice;
    private Date createdAt;
    private String youtubeLink;
    private List<BookingSeatsRequest> bookingSeatsRequestList;

    public BookingsRequest() {
    }

    public BookingsRequest(Bookings bookings) {
        this.id = String.valueOf(bookings.getId());
        this.userId = String.valueOf(bookings.getUserId());
        this.movieId = String.valueOf(bookings.getMovieId());
        this.userId = String.valueOf(bookings.getUserId());
        this.status = bookings.getStatus();
        this.totalPrice = bookings.getTotalPrice();
        this.createdAt = bookings.getCreatedAt();
        if (bookings.getSeats() != null && bookings.getSeats().size() > 0) {
            List<BookingSeatsRequest> bookingSeatsRequestList = new ArrayList<>();
            for (int i = 0; i < bookings.getSeats().size(); i++) {
                bookingSeatsRequestList.add(new BookingSeatsRequest(
                        String.valueOf(bookings.getSeats().get(i).getSeatId()),
                        bookings.getSeats().get(i).getSeatPrice())
                );
            }
            this.bookingSeatsRequestList = bookingSeatsRequestList;
        }
    }

}
