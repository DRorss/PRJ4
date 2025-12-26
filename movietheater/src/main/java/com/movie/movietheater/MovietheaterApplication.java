package com.movie.movietheater;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class MovietheaterApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovietheaterApplication.class, args);
	}

}
