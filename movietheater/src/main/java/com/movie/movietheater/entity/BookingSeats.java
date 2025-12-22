package com.movie.movietheater.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(
        name = "booking_seats",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"booking_id", "seat_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingSeats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // N seats -> 1 booking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Bookings booking;

    @Column(name = "seat_id", nullable = false)
    private Long seatId;

    @Column(name = "seat_price", nullable = false)
    private BigDecimal seatPrice;

    public BookingSeats(Long seatId, BigDecimal seatPrice, Bookings booking) {
        this.seatId = seatId;
        this.seatPrice = seatPrice;
        this.booking = booking;
    }
}