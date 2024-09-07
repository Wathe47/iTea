# Use the official OpenJDK 17 image as a base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/Inventory-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the application will run on
EXPOSE 9091

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
