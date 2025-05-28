# Aplicación Web Full-Stack de Turismo en Colombia 

# Jeiler David Medina Zapata 

# Introducción 

Colombia es un país reconocido por su diversidad geográfica, cultural y natural. Desde playas paradisíacas en el Caribe hasta selvas tropicales en el Amazonas, pasando por majestuosas cordilleras y pueblos coloniales, el país ofrece una variedad de destinos que lo convierten en un lugar ideal para el turismo. Con el objetivo de resaltar y promover esta riqueza, se ha desarrollado una aplicación web full-stack que centraliza información clave sobre sitios turísticos representativos del país.
Esta aplicación permite a los visitantes descubrir lugares destacados, conocer sus características principales y recibir recomendaciones para planificar su viaje. Además, la plataforma incorpora funcionalidades específicas según el rol del usuario: un visitante general puede explorar libremente la información, mientras que un guía turístico autorizado puede gestionar contenido relacionado con los destinos. Por su parte, un administrador tiene acceso a la gestión de usuarios del sistema.
El desarrollo de este proyecto permite aplicar conocimientos técnicos adquiridos en bases de datos, desarrollo backend y frontend, arquitectura RESTful, control de roles y despliegue en la nube, todo con el propósito de construir una solución funcional, intuitiva y útil para promover 

# 2. Arquitectura

La aplicación web para la promoción del turismo en Colombia se construyó siguiendo una arquitectura cliente-servidor de tipo full-stack, basada en tecnologías modernas y ampliamente utilizadas en el desarrollo web.

# Componentes principales:

# •	Frontend (Cliente):
Desarrollado con React, este componente ofrece una interfaz de usuario moderna, dinámica y responsiva. Permite a los usuarios explorar destinos turísticos, iniciar sesión según su rol (visitante, guía o administrador) y realizar las acciones correspondientes.
# •	Backend (Servidor): 
Implementado con Node.js y Express, el backend expone una API RESTful que gestiona la lógica del sistema, la autenticación, los roles y las operaciones CRUD sobre las entidades del sistema.
# •	Base de Datos: 
Se utilizó MySQL como sistema de gestión de base de datos relacional, encargado de almacenar información estructurada sobre los usuarios y los lugares turísticos.
# •	Middleware de Autenticación:
Se implementó un middleware personalizado para proteger las rutas según el rol del usuario, asegurando que solo los usuarios autorizados puedan acceder a determinadas funciones.
# •	Despliegue:
La aplicación está diseñada para ser desplegada en la nube mediante plataformas gratuitas o de bajo costo, lo que permite su acceso público desde cualquier lugar.

# Diagrama de Arquitectura:

•	El navegador del usuario interactúa con la interfaz React.
•	React envía peticiones a la API Express alojada en un servidor backend.
•	El backend consulta o modifica los datos en MySQL.
•	Los datos son devueltos al frontend para ser mostrados al usuario.

![image](https://github.com/user-attachments/assets/c1c28443-a887-4c81-b662-e305b26b7122)

# 3. Diseño de la Base de Datos

La base de datos fue diseñada utilizando MySQL, con el objetivo de almacenar y organizar eficientemente la información relacionada con los usuarios y los sitios turísticos del sistema. La estructura está basada en dos entidades principales: usuarios y lugares_turisticos, y contempla relaciones que permiten asociar a los guías turísticos con los contenidos que gestionan.

# Entidades principales:

# usuarios

•	Representa a todas las personas que interactúan con la plataforma.
•	Campos: id, nombre, correo, contrasena, rol.
•	Roles disponibles: publico, guia, administrador.

# ciudades

•	Tabla independiente para evitar duplicidad y permitir filtros o agrupamientos por ubicación.
•	Campos: id, nombre.

# lugares_turisticos

•	Entidad principal del sistema, almacena los destinos turísticos que serán mostrados en la plataforma.
•	Campos: id, nombre, ciudad_id, descripcion, imagen_url, recomendaciones, creado_por.
•	Relaciones:
o	ciudad_id (FK) → ciudades.id
o	creado_por (FK) → usuarios.id

# resenas

•	Permite a los usuarios del rol público dejar comentarios y calificaciones (1 a 5 estrellas) sobre destinos turísticos.
•	Campos: id, usuario_id, lugar_id, calificacion, comentario, fecha.
•	Clave compuesta para evitar reseñas duplicadas por usuario/destino.
•	Relaciones:
•	usuario_id (FK) → usuarios.id
•	lugar_id (FK) → lugares_turisticos.id

 # logs
  
•	Registra acciones administrativas o de guías, como edición de destinos.
•	Campos: id, accion, usuario_id, fecha.
•	Relaciones:
•	usuario_id (FK) → usuarios.id

![image](https://github.com/user-attachments/assets/e3b6c60e-a807-4547-83fe-0ab1b7f78681)

# Diagrama de Casos de Uso

El sistema está diseñado para dar soporte a tres tipos de usuarios con funcionalidades específicas según su rol: Público General, Administrador y Guía Turístico. A continuación, se presenta el diagrama de casos de uso que describe las principales interacciones de estos usuarios con el sistema

# Casos de Uso por Rol:
  •	Público General:
     •	Consultar lista de destinos turísticos.
     •	Ver detalles de un lugar turístico.
     •	Realizar reseñas y calificar destinos.
  •	Administrador:
     •	Iniciar sesión.
     •	Gestionar usuarios (crear, listar, editar roles).
     •	Eliminar usuarios si es necesario.
  •	Guía Turístico:
     •	Iniciar sesión.
     •	Crear nuevos destinos turísticos.
     •	Editar la información de los destinos asignados.
     •	Eliminar destinos creados por él.

![image](https://github.com/user-attachments/assets/8fc2eb81-f3ad-4c00-9553-64137b419bb2)


# 5. Lista de Endpoints del Backend

A continuación, se presenta una tabla con los principales endpoints disponibles en la API del backend. Estos endpoints permiten gestionar usuarios, destinos turísticos y autenticación, con restricciones según el rol del usuario autenticado:

# Método	 | Endpoint	          | Descripción	                                | Autenticación / Rol
  POST	   | /api/login	        | Inicia sesión y devuelve un token JWT       |  No
  GET	    |  /api/destinos	    |   Lista todos los destinos turísticos	      |   Público
  GET	    |  /api/destinos/:id	|   Obtiene detalles de un destino específico	|   Público
  POST	   | /api/destinos	     |  Crea un nuevo destino turístico	           |  Guía Turístico
  PUT	    |  /api/destinos/:id	|   Edita un destino turístico	               |    Guía Turístico
  DELETE	 | /api/destinos/:id  |  Elimina un destino turístico	              |   Guía Turístico
  GET    	|  /api/usuarios	    |   Lista todos los usuarios registrados      |    Administrador
  POST  	 | /api/usuarios	     |  Crea un nuevo usuario	                     |  Administrador
  PUT	    |  /api/usuarios/:id	|  Modifica datos o rol de un usuario	        |   Administrador

Perfecto, continuamos con la sección 6. Implementación, que describe el proceso de desarrollo, retos técnicos, decisiones tomadas y cómo se organizó el trabajo.
#  6. Implementación

# Proceso de Desarrollo

El desarrollo de la aplicación web “Turismo en Colombia” se realizó siguiendo un enfoque incremental y por capas, dividiendo el proyecto en tres componentes principales:
    •	Frontend: construido con React.js, se encargó de la interfaz de usuario, ofreciendo una 
    experiencia visual atractiva, intuitiva y adaptable a diferentes dispositivos.
    •	Backend: implementado con Node.js y Express, manejó la lógica de negocio, autenticación y 
    exposición de la API RESTful.
    •	Base de Datos: desarrollada con MySQL, almacenó de forma estructurada la información 
    sobre usuarios, roles y destinos turísticos.
    
Se utilizó JWT (JSON Web Tokens) para la autenticación y control de acceso basado en roles. El backend incluye middlewares de verificación de tokens y validación de roles para proteger rutas sensibles.

# División del Trabajo

El trabajo se organizó en fases semanales:
     diseño de la base de datos y prototipo de frontend.
     desarrollo del backend (API RESTful) y pruebas con Postman.
     integración con el frontend y autenticación JWT.
     
# No se pudo implementar el sistema en la nube por falta de recursos monetarios

      
# Retos Técnicos y Soluciones
   •	Manejo de roles: fue necesario implementar un sistema robusto de autenticación con 
   verificación de permisos. Se creó un middleware personalizado para restringir accesos.
   •	Relación entre entidades: se diseñaron claves foráneas y relaciones bien definidas para 
   vincular destinos turísticos con sus respectivos guías.
   •	Conexión entre frontend y backend: se enfrentaron problemas de CORS, resueltos 
   configurando adecuadamente los encabezados en Express.
   
# Decisiones de Diseño

   •	Se priorizó una interfaz responsiva y accesible.
   •	Los datos sensibles del usuario (como contraseñas) se almacenan con hash utilizando bcrypt.
   •	Se organizaron los endpoints en rutas claras y modulares para mejorar el mantenimiento.

# 7. Pruebas al Backend

Para validar el correcto funcionamiento de la API RESTful, se realizaron pruebas exhaustivas utilizando la herramienta Postman. Las pruebas se enfocaron en los endpoints clave del sistema, verificando el comportamiento esperado para cada rol de usuario.

Autenticación
Endpoint: POST /api/login
Request Body:

 ![image](https://github.com/user-attachments/assets/f46ce371-93d5-4926-a758-8709fd219489)

# CRUD de Destinos Turísticos (Guía Turístico)
# Crear Destino
  •	Endpoint: POST /api/destinos
  •	Headers: Authorization: Bearer <token>
  •	Request Body:
 ![image](https://github.com/user-attachments/assets/20bda76b-d181-4523-b9d0-7166a09521f5)

# Gestión de Usuarios (Administrador)
# Crear Usuario
  •	Endpoint: POST /api/usuarios
  •	Request Body:
 ![image](https://github.com/user-attachments/assets/a4e1d186-27b6-4999-97da-9f5b893abd53)


# 8. Pruebas al Frontend

Las pruebas al frontend se realizaron accediendo a la aplicación desplegada en un navegador web, evaluando la interacción de los diferentes roles con la interfaz. A continuación, se describe el comportamiento esperado y verificado para cada uno.

#  Administrador

•	Acciones disponibles:
     •	Iniciar sesión mediante formulario de acceso.
     •	Puede agregar o eliminar sitios turisticos
     •	Puede eliminar los comentarios y las reseñas
•	Pruebas realizadas:
     •	crear un sitio nuevo
     •	Actualizar un lugar

![image](https://github.com/user-attachments/assets/382847e4-c60a-45c6-b8fe-b67c37e06a1d) ![image](https://github.com/user-attachments/assets/068b6f06-5c3f-4373-aba7-8f8af9c55d01)


# Guía Turístico
  •	Acciones disponibles:
    •	Iniciar sesión.
    •	Crear destinos turísticos.
    •	Editar o eliminar destinos que le pertenecen.
•	Pruebas realizadas:
    •	Cambiar imagen de un lugar turístico
 
 ![image](https://github.com/user-attachments/assets/2bdc8fdd-394b-4151-9c15-e241166e494c)

Público General
•	Acciones disponibles:
    •	Ver lista de destinos turísticos.
    •	Consultar detalles de un destino.
•	Pruebas realizadas:
    •	Dejar comentario
    •	Dejar reseña
    •	Visitar mapa interactivo

![image](https://github.com/user-attachments/assets/8ecd5a30-14e7-4d2a-a881-2e6959793677)
![image](https://github.com/user-attachments/assets/8a8456f1-7b2d-4279-9f10-86429a1ff1df)


# 9. Despliegue

Con el fin de hacer accesible la aplicación desde cualquier lugar y permitir su evaluación externa, se realizó el despliegue completo en la nube. Tanto el frontend como el backend, junto con la base de datos MySQL.

# Servicios Utilizados

Frontend (React): desplegado Vercel: 
https://turismo-frontend-theta.vercel.app/ 
único sirvió utilizado ya que para los del backend eran de paga así que No se pudo implementar el sistema en la nube por falta de recursos monetarios

# 10. Conclusiones

El desarrollo de la aplicación web Full-Stack Turismo en Colombia representó una valiosa oportunidad para integrar múltiples conocimientos adquiridos durante el semestre.

Durante el proyecto, logre:
     •	Comprender y aplicar la arquitectura cliente-servidor mediante la creación de una API 
     RESTful con Node.js y Express.
     •	Diseñar una base de datos relacional funcional y normalizada en MySQL, con relaciones 
     bien definidas entre entidades.
     •	Construir una interfaz de usuario moderna y responsiva con React, adaptada a las 
     necesidades de diferentes tipos de usuario.
     •	Implementar correctamente la autenticación y autorización por roles usando JWT, lo que 
     permitió asegurar los accesos y proteger los datos sensibles.
