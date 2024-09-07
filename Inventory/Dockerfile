# Use the official OpenJDK 17 image as a base image
FROM openjdk:17-jdk-slim

# Create a group and user to run the app
RUN addgroup -S spring && adduser -S spring -G spring

# Set the working directory inside the container
WORKDIR /app

# Change ownership of the working directory
RUN chown -R spring:spring /app

# Switch to the non-root user
USER spring

# Copy the JAR file into the container
COPY target/Inventory-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the application will run on
EXPOSE 9091

# Define the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
