#!/bin/bash
# Navigate to the project directory
cd "$(dirname "$0")"

# Clean and build the project
mvn clean install

# Navigate to target directory
cd target

# Run the built jar file
java -jar spring-back-0.0.1-SNAPSHOT.jar
