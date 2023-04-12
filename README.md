# ISST-Grupo19-Caso Integral
Esta aplicación es un MVP enmarcado en el contexto de la transformación digital de una correduría de seguros. Sirve como gestor de seguros, clientes, pólizas y tareas al corredor, y permite a los clientes ver qué seguros tienen contratados a través de la correduría. Es un sistema CRM/ERP muy simplificado.
## Cómo lanzarlo
Esto es una aplicación web con dos proyectos diferenciados (front-end y back-end) en carpetas distintas.

Para probarlo, lance el servidor con:

```bash
    ./mnvm clean install spring-boot:run -DskipTests=true
```

La aplicación cliente debe lanzarse con:

```bash
    npm install
```
y posteriormente
```bash
    npm start
```
