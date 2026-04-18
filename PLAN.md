# Plan de Mejoras - Portafolio Personal

## Convenciones Git Branch

```
feature/<id>-<descripcion>   # Nuevas funcionalidades (fase 2)
fix/<id>-<descripcion>      # Bug fixes y mejoras (fase 1)
integration/<id>-<descripcion>  # Combinación de branches
```

Flujo de trabajo:
1. Crear branch desde `main`: `git checkout -b feature/1.1-animaciones-pagina`
2. Trabajar y commits regulares
3. Push y crear PR/MR a main
4. Merge y eliminar branch

---

## Fase 1: UX/UI y Diseño

- [ ] 1.1 Animaciones de página - Transiciones smooth entre rutas (Angular animations)
      Branch: `fix/1.1-animaciones-pagina`
- [ ] 1.2 Skeleton loaders - Loading states mientras cargan datos
      Branch: `fix/1.2-skeleton-loaders`
- [ ] 1.3 Mejorar navbar - Sticky con backdrop blur, mobile menu mejorado
      Branch: `fix/1.3-mejorar-navbar`
- [ ] 1.4 Efectos hover en proyectos - Cards con zoom/overlay informativo
      Branch: `fix/1.4-hover-proyectos`
- [ ] 1.5 Theme toggle animado - Icono con transición states
      Branch: `fix/1.5-theme-toggle-animado`
- [ ] 1.6 Optimizar responsive - breakpoints para tablet/mobile
      Branch: `fix/1.6-optimizar-responsive`

## Fase 2: Nueva Funcionalidad

- [ ] 2.1 Sección Skills - Visualización gráfica (Progress bars / icons grid)
      Branch: `feature/2.1-seccion-skills`
- [ ] 2.2 Timeline de experiencia - Línea de tiempo profesional
      Branch: `feature/2.2-timeline-experiencia`
- [ ] 2.3 CV descargable - Botón para descargar PDF del CV
      Branch: `feature/2.3-cv-descargable`
- [ ] 2.4 Links a redes sociales - Con iconos y hover effects
      Branch: `feature/2.4-redes-sociales`
- [ ] 2.5 SEO meta tags - Open Graph, Twitter Cards para compartir
      Branch: `feature/2.5-seo-meta-tags`
- [ ] 2.6 Formulario de contacto funcional - Envío con EmailJS o backend
      Branch: `feature/2.6-formulario-contacto`

## Fase 3: Código y Arquitectura

- [ ] 3.1 Lazy loading total - Para todas las rutas
      Branch: `fix/3.1-lazy-loading`
- [ ] 3.2 Add tests - Unit tests con Jasmine/Karma o jest
      Branch: `feature/3.2-add-tests`
- [ ] 3.3 Angular 19+ - Actualizar a última versión estable
      Branch: `fix/3.3-actualizar-angular`
- [ ] 3.4 Service Worker - PWA capabilities (offline mode)
      Branch: `feature/3.4-service-worker`
- [ ] 3.5 Accessibility - ARIA labels, keyboard navigation, contrast
      Branch: `fix/3.5-accessibility`