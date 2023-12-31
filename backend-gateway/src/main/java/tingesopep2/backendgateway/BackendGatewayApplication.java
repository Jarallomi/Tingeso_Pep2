package tingesopep2.backendgateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BackendGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendGatewayApplication.class, args);
	}

}
