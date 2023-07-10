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

4. Reconstruir base de datos.
```
http://localhost:3000/api/seed
```

# Stack
* NestJS v10
* MongoDB v5