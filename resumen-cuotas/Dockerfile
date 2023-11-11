FROM openjdk:17
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} resumen-cuotas-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/resumen-cuotas-0.0.1-SNAPSHOT.jar"]