# Residencial Los Robles

Prototipo académico desarrollado con React y Vite para la administración de servicios del Residencial Los Robles.

## Avance acumulado de la Unidad 3

El proyecto se desarrolló en un solo repositorio mediante cinco Sprints y diez historias de usuario.

### Sprint 1

- H01: Login y Registro.
- H02: Base técnica y planeación de una base de datos segura.

### Sprint 2

- H03: Panel de Pagos.
- H07: Recuperación de Contraseña.

### Sprint 3

- H04: Reportes PDF y Excel.
- H09: Avisos Masivos.

### Sprint 4

- H05: Diseño Móvil.
- H08: Módulo de Visitas.

### Sprint 5

- H06: Manual en PDF.
- H10: Buzón de Incidencias.

## Funcionalidades disponibles

### Acceso y recuperación

- Inicio y cierre de sesión.
- Validación de correo y contraseña.
- Recuperación mediante código académico.
- Actualización local de la contraseña.

### Panel de Pagos

- Indicadores financieros.
- Consulta de viviendas y residentes.
- Búsqueda y filtros por estado.
- Confirmación y registro de pagos.
- Actualización automática de saldos.
- Persistencia local de demostración.

### Reportes

- Selección de información de pagos, visitas, incidencias o avisos.
- Filtros por estado.
- Vista previa de registros.
- Descarga CSV compatible con Excel.
- Impresión o guardado como PDF desde el navegador.

### Avisos Masivos

- Publicación de comunicados.
- Categorías y destinatarios.
- Búsqueda de avisos.
- Archivo y reactivación.
- Persistencia local.

### Control de Visitas

- Registro de entrada.
- Registro de salida.
- Indicadores de visitantes.
- Búsqueda y filtros.
- Historial de visitas.

### Buzón de Incidencias

- Generación automática de folios.
- Categorías y prioridades.
- Búsqueda y filtros.
- Seguimiento de estados: Recibida, En atención y Resuelta.
- Indicadores operativos.

### Manual y Ayuda

- Instrucciones de acceso y uso.
- Explicación de los módulos.
- Recomendaciones de seguridad.
- Preguntas frecuentes.
- Vista imprimible para guardar como PDF.

### Diseño Móvil

Las pantallas, tarjetas, formularios, indicadores, navegación y tablas cuentan con ajustes responsivos para computadora, tableta y teléfono.

## Credenciales de demostración

- Correo: `residente@losrobles.mx`
- Contraseña inicial: `Robles2026`
- Código académico de recuperación: `ROBLES26`

> Importante: el proyecto utiliza datos ficticios. No deben capturarse datos personales ni credenciales reales.

## Tecnologías

- React
- Vite
- JavaScript
- CSS
- localStorage
- Git y GitHub
- Trello para seguimiento Scrum

## Ejecución local

```bash
npm install
npm run dev
```

Vite mostrará una dirección local, normalmente:

```text
http://localhost:5173/
```

## Compilación

```bash
npm run build
```

La compilación se genera en la carpeta `dist`.

## Documentación de la Unidad 3

```text
Documentacion_Unidad_3/
├── Actividad_1_Primera_Fase/
├── Actividad_2_Segunda_Fase/
├── Actividad_3_Tercera_Fase/
└── Equipo_3_Retomando_mi_primer_sprint.docx
```

## Repositorio

https://github.com/AbrahamMarquezg/Proyecto-Los-Robles

## Alcance académico

La información se conserva mediante `localStorage` para demostrar el funcionamiento del prototipo. Una implementación productiva requiere backend, base de datos, autenticación segura, hash de contraseñas, permisos por rol, auditoría, copias de seguridad y validaciones del servidor.

## Autor

Abraham Márquez García
