package com.craft.craft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CraftApplication {

	public static void main(String[] args) {
		SpringApplication.run(CraftApplication.class, args);
	}

}
