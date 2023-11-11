FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} subir-archivo-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/subir-archivo-0.0.1-SNAPSHOT.jar"]