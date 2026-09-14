# Stage 1: Build Java 21 Spring Boot application
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy Maven Project Object Model
COPY pom.xml .

# Download dependencies (leveraging Docker layer cache)
RUN mvn dependency:go-offline -B || true

# Copy application source code
COPY src ./src

# Package application JAR without running unit tests during image build
RUN mvn clean package -DskipTests -B

# Stage 2: Lightweight Production JRE runtime
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Create a dedicated non-root application user and ensure writable data directory
RUN addgroup -S spring && adduser -S spring -G spring \
    && mkdir -p /app/data \
    && chown -R spring:spring /app \
    && chmod -R 777 /app/data

USER spring:spring

# Copy built JAR from builder stage
COPY --from=build --chown=spring:spring /app/target/*.jar app.jar

# Expose Spring Boot default application port
EXPOSE 8080

# Configure JVM memory limits for containerized deployment
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
