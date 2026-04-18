# Configuración de Componentes Angular

Para este proyecto, se debe seguir la siguiente convención al crear o modificar componentes:

- **No usar standalone:** Los componentes deben usar `standalone: false`.
- **Separación de archivos:** Mantener siempre el HTML (plantilla) y el SCSS (estilos) en archivos separados (`.html` y `.scss`) para cada componente.
- **Estructura del Componente:**
  - Referenciar la plantilla HTML usando `templateUrl: './[nombre].component.html'`.
  - Referenciar los estilos SCSS usando `styleUrl: './[nombre].component.scss'`.