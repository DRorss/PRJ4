package com.movie.movietheater.service.Impl;

import com.movie.movietheater.dto.request.*;
import com.movie.movietheater.dto.response.AuthenResponse;
import com.movie.movietheater.dto.response.CheckValidEmailResponse;
import com.movie.movietheater.dto.response.UserResponse;
import com.movie.movietheater.entity.BookingSeats;
import com.movie.movietheater.entity.Bookings;
import com.movie.movietheater.entity.Film;
import com.movie.movietheater.entity.User;
import com.movie.movietheater.repository.BookingSeatsRepository;
import com.movie.movietheater.repository.BookingsRepository;
import com.movie.movietheater.repository.FilmRepository;
import com.movie.movietheater.repository.UserRepository;
import com.movie.movietheater.service.AuthenService;
import com.movie.movietheater.service.BookingsService;
import com.movie.movietheater.utils.CustomExceptionHandler;
import com.movie.movietheater.utils.JwtUtils;
import com.movie.movietheater.utils.ResultResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingsServiceImpl implements BookingsService {

    @Autowired
    private BookingsRepository bookingsRepository;

    @Autowired
    private BookingSeatsRepository bookingSeatsRepository;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private FilmRepository filmRepository;

    public Bookings booking(BookingsRequest bookingsRequest) {
        Bookings bookings = new Bookings();
        try {
            Long id = userRepo.findByUserName(bookingsRequest.getUserName()).get().getId();
            bookings = new Bookings(id, bookingsRequest.getStatus(), bookingsRequest.getTotalPrice(),
                    new Date(), Long.valueOf(bookingsRequest.getMovieId()));
            bookingsRepository.save(bookings);
            if (bookings.getId() != null) {
                List<BookingSeats> bookingSeatsList = new ArrayList<>();
                for (BookingSeatsRequest bookingSeatsRequest : bookingsRequest.getBookingSeatsRequestList()) {
                    bookingSeatsList.add(new BookingSeats(Long.valueOf(bookingSeatsRequest.getSeatId()),
                            bookingSeatsRequest.getSeatPrice(), bookings));
                }
                bookingSeatsRepository.saveAll(bookingSeatsList);
            }
        } catch (Exception ex) {
            throw new RuntimeException();
        }
        return bookings;
    }

    public UserResponse getInfoUser(String userName) {
        Optional<User> user = userRepo.findByUserName(userName);
        if (user.isPresent()) {
            List<Bookings> bookingsList = bookingsRepository.findAllByUserId(user.get().getId());

            List<BookingsRequest> bookingsRequests = new ArrayList<>();
            if (bookingsList != null && bookingsList.size() > 0) {
                for (int i = 0; i < bookingsList.size(); i++) {
                    Bookings bookings = bookingsList.get(i);
                    BookingsRequest bookingsRequest = new BookingsRequest(bookings);
                    Optional<Film> fop = filmRepository.findById(bookingsList.get(0).getMovieId());
                    if(fop.isPresent()){
                        FilmRequest fr = new FilmRequest(fop.get());
                        bookingsRequest.setMovieName(fr.getName());
                        bookingsRequest.setVolumnFilm(String.valueOf(fr.getVolumnFilm()));
                        bookingsRequest.setYoutubeLink(fr.getYoutubeLink());
                    }
                    bookingsRequests.add(bookingsRequest);
                }
            }

            return new UserResponse(user.get().getUserName(),
                    user.get().getEmail(),
                    user.get().getFullName(),
                    user.get().getRole(),
                    bookingsRequests);
        } else {
            throw new UsernameNotFoundException("Không tìm thấy người dùng");
        }
    }
}
