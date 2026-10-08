# Actividad 1. Primera fase de desarrollo, revisión y ajuste de los Sprints

## Proyecto

Sistema Web para la Gestión de Servicios Comunitarios del Residencial Los Robles.

## Integrantes

- Abraham Márquez García
- Mario Ontiveros Mendoza

## Sprint revisado

Sprint 1.

## Historias trabajadas

- H01: Login y Registro.
- H02: Base de Datos Segura.

## Objetivo del Sprint

Desarrollar un prototipo navegable de acceso para residentes y establecer la base técnica inicial para la gestión segura de usuarios.

## Avances de H01

Se desarrolló un prototipo funcional de acceso mediante React. El sistema permite:

- Capturar correo electrónico y contraseña.
- Validar campos vacíos.
- Validar el formato del correo.
- Identificar credenciales incorrectas.
- Acceder al panel con credenciales de demostración.
- Consultar el estado del módulo H01.
- Cerrar la sesión.
- Regresar a la pantalla principal.

H01 se considera terminada dentro del alcance funcional del prototipo de acceso. El registro persistente dependerá de la integración de H02.

## Avances de H02

Se estableció la base técnica inicial:

- Ambiente React y Vite.
- Tabla prevista de usuarios.
- Requisito de persistencia identificado.
- Protección futura mediante hash de contraseñas.

H02 permanece en revisión porque todavía requiere backend, base de datos, persistencia y protección real de contraseñas.

## Ajustes realizados

- H01 se desglosó en validación y navegación.
- Se utilizaron credenciales académicas de demostración.
- La recuperación de contraseña se conservó para el Sprint 2.
- Se agregó un panel general de módulos.
- Se incorporó el cierre de sesión.
- H02 se delimitó como preparación técnica.
- Se agregaron estilos responsivos básicos.

## Credenciales de demostración

- Correo: `residente@losrobles.mx`
- Contraseña: `Robles2026`

## Ejecución del proyecto

Instalar las dependencias:

```bash
npm install