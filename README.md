# ISST-Grupo19-Caso Integral
Este proyecto consiste en una aplicación web MVP diseñada para una correduría de seguros que busca transformarse digitalmente. La aplicación funciona como un gestor de seguros, clientes, pólizas y tareas para el corredor, y permite a los clientes visualizar los seguros que tienen contratados a través de la correduría. Es un sistema CRM/ERP muy simplificado. Existen dos roles: ADMIN para el corredor de seguros y USER para el cliente de la correduría.

Video demo proyecto: https://www.loom.com/share/c199cbd21e0f4e209d22e5c6a94de2af

## Tecnologías
Front-end: React.js y librería primereact.
Back-end: Spring Boot y JWT.
La aplicación está securizada con Spring Security y JWT.
## Cómo lanzarlo
Esto es una aplicación web con dos proyectos diferenciados (front-end y back-end) en carpetas distintas.

Para probarlo, lance el servidor con:

```bash
    ./mvnw clean install spring-boot:run -DskipTests=true
```

La aplicación cliente debe lanzarse con:

```bash
    npm install
```
y posteriormente
```bash
    npm start
```

# ISST-Group19-Comprehensive Case

This project consists of an MVP web application designed for an insurance brokerage aiming to undergo digital transformation. The application serves as an insurance manager for policies, clients, and tasks for the broker, while also allowing clients to view the insurance policies they have contracted through the brokerage. It functions as a simplified CRM/ERP system. There are two roles: ADMIN for the insurance broker and USER for the brokerage's client.

[Project Demo Video](https://www.loom.com/share/c199cbd21e0f4e209d22e5c6a94de2af)

## Technologies
- Front-end: React.js with the PrimeReact library.
- Back-end: Spring Boot with JWT (JSON Web Tokens).
- The application is secured using Spring Security and JWT.

## How to Launch

This is a web application with two separate projects (front-end and back-end) in different directories.

To run the server, use:

./mvnw clean install spring-boot:run -DskipTests=true


The client application should be launched with:

npm install

followed by

npm start


### Additional Instructions
- Ensure that Node.js and npm are installed on your machine for running the front-end application.
- Make sure to have Java and Maven installed for the backend Spring Boot application.
  
### Usage
- After launching both the server and client applications, you can access the web application through the provided URL (typically http://localhost:3000) to start interacting with the system.
  
### Security Considerations
- Since the application is secured using JWT and Spring Security, ensure that proper authentication and authorization mechanisms are set up as per the project's requirements and security policies.

For any issues or inquiries related to this application, please refer to the project repository or contact the project team for assistance.
