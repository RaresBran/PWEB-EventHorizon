package com.pweb.eventhorizon;

import com.pweb.eventhorizon.model.dto.RegisterRequest;
import com.pweb.eventhorizon.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.pweb.eventhorizon.model.Role.ADMIN;

@SpringBootApplication
public class EventhorizonApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventhorizonApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(AuthenticationService service) {
		return args -> {
			var admin1 = RegisterRequest.builder()
					.firstName("Admin1")
					.lastName("Admin1")
					.email("admin1@admin.com")
					.password("parola")
					.role(ADMIN)
					.build();

			var admin2 = RegisterRequest.builder()
					.firstName("Admin2")
					.lastName("Admin2")
					.email("admin2@admin.com")
					.password("parola")
					.role(ADMIN)
					.build();

			System.out.println("Admin1 token: " + service.register(admin1).getToken());
			service.register(admin2);
		};
	}
}
