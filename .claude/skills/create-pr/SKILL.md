---
name: create-pr
description: Crea un pull request en GitHub. Usar cuando el usuario quiere crear un PR para la branch actual.
allowed-tools:
  - Bash
  - Read
---

# Create Pull Request Skill

Crea un pull request para la branch actual de trabajo.

## Pasos:

1. Verifica que hay cambios para hacer push: `git status`
2. Lee los archivos modificados para incluir en la descripción del PR
3. Haz push de la branch si no existe en remoto: `git push -u origin <branch>`
4. Obtén el branch name actual: `git rev-parse --abbrev-ref HEAD`
5. Obtén el ID y título de la tarea desde PLAN.md (busca la línea con la branch actual)
6. Crea el PR usando gh con:
   - Título: formato `<tipo>/<id>: <título>` (ej: `fix/1.1: Animaciones de página`)
   - Body: describe los cambios realizados y referencia la tarea
   - Base: main