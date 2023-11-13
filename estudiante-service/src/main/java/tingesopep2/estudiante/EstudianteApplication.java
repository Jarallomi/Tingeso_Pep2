package tingesopep2.estudiante;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class EstudianteApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstudianteApplication.class, args);
	}

}
