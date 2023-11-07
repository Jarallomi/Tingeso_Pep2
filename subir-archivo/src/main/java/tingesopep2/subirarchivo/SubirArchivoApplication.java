package tingesopep2.subirarchivo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SubirArchivoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SubirArchivoApplication.class, args);
	}

}
