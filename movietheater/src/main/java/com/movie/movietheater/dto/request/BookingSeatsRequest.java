package com.movie.movietheater.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class BookingSeatsRequest {
    private String seatId;
    private BigDecimal seatPrice;

}
