<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Prerrequisitos
1. Tener [Node.js](https://nodejs.org/es/download) 18 LTS instalado.
2. Tener Nest CLI instalado.
```
npm i -g @nestjs/cli
```
3. Tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

# Ejecutar en desarrollo

1. Clonar este repositorio.

2. Ejecutar.
```
yarn install
```

3. Levantar la base de datos.
```
docker-compose up -d
```

4. Crear el archivo `.env` en base al ejemplo en `.env.example` y definir las variables de entorno del ejemplo.

5. Ejecutar la aplicación en modo desarrollo.
```
yarn start:dev 
```

6. Reconstruir base de datos.
```
http://localhost:3000/api/seed
```

# Docker Production Build

1. Crear el archivo `.env` en base al ejemplo en `.env.example` y definir las variables de entorno del ejemplo.

2. Crear la imagen de docker.
```
docker-compose -f docker-compose.prod.yaml up --build
```

# Stack
* NestJS v10
* MongoDB v5