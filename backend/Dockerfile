# Use an official Maven image to build the app
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code and build the application
COPY src ./src
RUN mvn clean package -DskipTests

# Use an official Java image to run the application
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/target/DreamJournaal-1.0-SNAPSHOT.jar /app/DreamJournaal-1.0-SNAPSHOT.jar

# Copy the .env file into the container (optional if needed for inspection)
COPY .env /app/.env

# Verify that the JAR file is copied
RUN ls -l /app

# Expose port 8009
EXPOSE 8009

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "/app/DreamJournaal-1.0-SNAPSHOT.jar"]