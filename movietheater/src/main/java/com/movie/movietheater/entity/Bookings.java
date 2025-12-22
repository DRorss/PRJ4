package com.movie.movietheater.entity;

import com.movie.movietheater.dto.request.BookingSeatsRequest;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bookings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "movie_id", nullable = false)
    private Long movieId;

    @Column(nullable = false)
    private String status;       // PENDING / PAID / CANCELLED

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    // 1 booking có nhiều booking_seats
    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookingSeats> seats;

    public Bookings(Long userId, String status, BigDecimal totalPrice, Date createdAt, Long movieId) {
        this.userId = userId;
        this.status = status;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.movieId = movieId;
    }
}
