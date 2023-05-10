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
