---
name: create-branch
description: Crea una nueva branch para una tarea del PLAN. Usar cuando el usuario quiere trabajar en una tarea específica.
allowed-tools:
  - Bash
  - Grep
---

# Create Branch Skill

Crea una nueva branch para trabajar en una tarea del PLAN.

## Pasos:

1. Extrae el ID de la tarea de los argumentos dados (formato: "1.1", "2.3", etc.)
2. Busca en PLAN.md la línea con ese ID para obtener:
   - El nombre de la tarea
   - El tipo de branch asignada (feature/fix/integration)
3. Verifica que estás en main: `git rev-parse --abbrev-ref HEAD`
4. Crea y cambia a la nueva branch:
   - Si tiene tipo (feature/fix/integration): `git checkout -b <tipo>/<id>-<slug>`
   - Ejemplo: `git checkout -b fix/1.1-animaciones-pagina`
5. Confirma la creación con `git status`