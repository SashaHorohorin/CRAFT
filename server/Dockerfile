FROM adoptopenjdk/openjdk11:ubi
ARG JAR_FILE=craft-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 9005
EXPOSE 9999
ENTRYPOINT ["java","-jar","/app.jar"]
