FROM adoptopenjdk/openjdk11:latest
ARG JAR_FILE=craft-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 9005
ENTRYPOINT ["java","-jar","/app.jar"]