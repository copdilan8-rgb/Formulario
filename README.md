# ProyectoExamenD

## Descripción del proyecto
Aplicación web desarrollada con Next.js y Supabase que permite la gestión de tareas de usuarios autenticados. Incluye funcionalidades de autenticación, gestión de perfil y administración de tareas.

---

## Arquitectura del sistema

El sistema sigue una arquitectura por capas:

- **Frontend (Next.js)**: Manejo de vistas y componentes UI
- **Servicios (services)**: Lógica de negocio separada por módulos
- **Base de datos (Supabase/PostgreSQL)**: Persistencia de datos y autenticación

---

## Módulos principales

- **Auth**: Manejo de autenticación con Supabase
- **Perfil**: Gestión de datos del usuario
- **Tareas**: CRUD de tareas (crear, listar, actualizar estado, eliminar)

---

## Refactorización realizada

Se aplicaron mejoras en el código:

- Renombrado de funciones para mayor claridad (`listarTareas`, `cambiarEstadoTarea`)
- Eliminación de código duplicado mediante función `manejarError`
- Organización del archivo `tareas.js` para mejorar la legibilidad

---

## Funcionalidades implementadas

- Registro e inicio de sesión con Supabase
- Gestión de perfil de usuario
- Crear tareas
- Listar tareas
- Marcar tareas como completadas
- Eliminar tareas

---

## Seguridad

- Uso de autenticación con Supabase
- Implementación de Row Level Security (RLS)
- Políticas para restringir acceso a datos por usuario

---

## Tecnologías utilizadas

- Next.js
- Supabase
- PostgreSQL
- Tailwind CSS

---

## Conclusión

El sistema cumple con los principios básicos de ingeniería de software, aplicando buenas prácticas de organización, refactorización y seguridad.