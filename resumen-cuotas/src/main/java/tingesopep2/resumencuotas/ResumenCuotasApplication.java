package tingesopep2.resumencuotas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ResumenCuotasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumenCuotasApplication.class, args);
	}

}
