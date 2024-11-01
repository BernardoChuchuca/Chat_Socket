# BernardoChuchucaP
Para poder ejecutar nuestra imagen con la aplicacion deberemos realizar la documentacion, deberemos hacer los siguientes comandos:

## Ejecutar la imagen dentro del contenedor:

1. Ejecutar el contenedor Docker: Para poder usar la imagen de esta aplicacion deberemos correr el siguiente comando:
```bash
docker run -d --name chat_f -p 3000:3000 bnachoxt/chat_socket
```
![Imagen de prueba](https://imgur.com/fRVuorJ.jpg) 

2. Para poder si el contenedor inicio realizaremos el siguiente comando:
```bash
docker ps
```
![Descripción de la imagen](https://imgur.com/20vy80B.jpg)

3. Luego si queremos ver el log de nuestro contenedor deberemos copiar el id del contenedor:
```bash
docker logs <id-contenedor>
```
![Imagen de prueba](https://imgur.com/akisZ1v.jpg)

4. Ingresaremos a la direccion donde se alojo nuestro contenedor:
```bash
http://localhost:80/
http://localhost
```
4. Para probar su funcionalidad deberemos abrir dos pestañas de nuestra direccion y mandar mensajes y tendremos el chat el tiempo real.
![Imagen de prueba](https://imgur.com/vAh8TmO.jpg)

## Construccion de la aplicacion dentro del Dockerfile:

1. Utilizar la imagen oficial de Node.js como imagen base
```bash
FROM node:18
```
2. Establecer el directorio de trabajo en el contenedor para el backend
```bash
WORKDIR /usr/src/app/chat-backend
```
3. Copiar el 'package.json' y 'package-lock.json' del backend
```bash
COPY chat-backend/package*.json ./
```
4. Instalar las dependencias del backend
```bash
RUN npm install && npm cache clean --force
```
5. Copiar el resto del código fuente del backend
```bash
COPY chat-backend/ .
```
6. Cambiar al directorio del frontend
```bash
WORKDIR /usr/src/app/Front_Chat
```
7. Instalar Angular CLI globalmente
```bash
RUN npm install -g @angular/cli@14
```
8. Copiar el 'package.json' y 'package-lock.json' del frontend
```bash
COPY Front_Chat/package*.json ./
```
9. Instalar las dependencias del frontend
```bash
RUN npm install && npm cache clean --force
```
10. Copiar los archivos restantes del proyecto frontend
```bash
COPY Front_Chat/ .
```
11. Construir la aplicación Angular para producción
```bash
RUN ng build --configuration production
```
12. Cambiar de nuevo al directorio del backend para la ejecución
```bash
WORKDIR /usr/src/app/chat-backend
```
13. Exponer el puerto 3000 para el servidor Node.js y el puerto 80 para el servidor web
```bash
EXPOSE 3000 80
```
14. Comando para ejecutar el servidor Node.js y servir la aplicación Angular
```bash
CMD ["sh", "-c", "node index.js & npx http-server /usr/src/app/Front_Chat/dist/front-chat/browser -p 80"]
```
