FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /usr/app

# Package stage
FROM eclipse-temurin:17-jre-jammy

COPY /target/Inventory-0.0.1-SNAPSHOT.jar /usr/app/choreotest/Inventory-0.0.1-SNAPSHOT.jar

RUN mkdir /tmp/tomcat static
RUN chmod -R 777 /tmp
RUN chmod -R 777 /usr/app/choreotest/Inventory-0.0.1-SNAPSHOT.jar

RUN addgroup --system --gid 1001 wso2
RUN adduser --system --uid 10014 wso2
# Set a non-root user
USER 10014

ENTRYPOINT ["java","-jar","/usr/app/choreotest/Inventory-0.0.1-SNAPSHOT.jar"]
RUN echo `ls`
EXPOSE 8080

# BUILD WITH : docker build -t certifier/rest-app:<tag> .
# RUN WITH : docker run -d -p 8080:8080 certifier/rest-app:<tag>
