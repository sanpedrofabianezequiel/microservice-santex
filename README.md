# Challenge Proyecto

Este proyecto consiste en un sistema de microservicios compuesto por dos servicios individuales y un API Gateway, desarrollado para ser utilizado localmente y desplegado en el entorno de Amazon Web Services (AWS) utilizando AWS Lambda. El repositorio incluye un archivo Docker para facilitar el despliegue de la base de datos local y scripts preparados para CI/CD.

## Descripción General

El objetivo principal de este proyecto es demostrar la estructura y la implementación de microservicios, así como la configuración de un API Gateway para el manejo de estas aplicaciones. Está diseñado considerando las mejores prácticas de desarrollo, con la capacidad de escalar y desplegar fácilmente en la nube de AWS.

## Funcionalidades y Consideraciones

- **CI/CD:**
  - El repositorio está preparado para integración continua y despliegue continuo, con scripts configurados para la automatización del flujo de trabajo.
  
- **Docker:**
  - Se proporciona un archivo Docker para crear y ejecutar la base de datos local necesaria para el desarrollo y pruebas.

- **GraphQL y Apollo Studio:**
  - La implementación utiliza GraphQL para las consultas y Apollo Studio para facilitar la gestión y documentación de las APIs.

- **Autenticación JWT (Actualmente comentada):**
  - A pesar de contar con autenticación JWT, no se ha implementado la lógica completa de filtros ni validaciones específicas para ciertos roles debido a limitaciones de tiempo durante el sprint.

- **Escalabilidad en AWS Lambda:**
  - Cada servicio está preparado como un módulo Lambda independiente para permitir un despliegue sencillo y escalable en la infraestructura serverless de AWS.

## Configuración del Entorno

El proyecto utiliza variables de entorno definidas en el archivo `.env`, con valores preconfigurados para una fácil configuración y uso.

## Pasos para Levantar el Proyecto Localmente

### Base de Datos Local

Para iniciar la base de datos local, siga estos pasos:

1. Ubíquese en el directorio raíz del proyecto (`profile-node` o `business-node`).
2. Ejecute el siguiente comando:

```bash
docker-compose up
```


Esto pondrá en marcha la base de datos local necesaria para el proyecto.

Iniciar Aplicaciones
Las aplicaciones deben ser iniciadas en el siguiente orden:

## Bussiness-node - http://localhost:3003/graphql

## Ejecute el siguiente comando desde la raíz del proyecto:

- npm i
- npm run start:dev


## Profile-node - http://localhost:3002/graphql

## Ejecute el siguiente comando desde la raíz del proyecto:

- npm i
- npm run start:dev

## Gateway-node - http://localhost:3001/graphql

## Ejecute el siguiente comando desde la raíz del proyecto:

- npm i
- npm run start:dev



Se recomienda iniciar cada aplicación utilizando los comandos específicos detallados en el archivo package.json.

Notas Finales
Este proyecto se ha desarrollado siguiendo las mejores prácticas de arquitectura de microservicios y está diseñado para mostrar la implementación de un sistema escalable y robusto. Si tienes alguna pregunta o sugerencia para mejorar este proyecto, no dudes en contactarme. Tu retroalimentación es valiosa para seguir mejorando
