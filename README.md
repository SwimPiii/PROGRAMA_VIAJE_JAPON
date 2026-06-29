# Bitacora Viaje Japon 2026

Aplicacion web estatica para seguir el itinerario del viaje a Japon, marcar lugares visitados, registrar gastos y compartir el estado con otras personas usando Google Drive.

## Que hace

- carga el itinerario completo del viaje ya preparado
- permite marcar sitios visitados dia por dia
- guarda notas reales del dia
- registra gastos por fecha, categoria y persona
- sincroniza el estado en Drive para que otros usuarios con acceso vean lo mismo

## Proyecto separado

Este proyecto esta preparado para vivir en un repositorio propio, separado del resto de apps del workspace.

## Drive configurado

- Carpeta: PROGRAMA_VIAJE_JAPON
- Folder ID: 1f3EF8wa_oc6BcFYhnTjLB8FcjDT93ZR-
- Fichero principal: viaje_japon_2026_state.json

## Como compartirlo con tus padres

- Compartes con ellos la carpeta de Drive o les das acceso a la cuenta que vaya a usar la app.
- Si entran en la web con una cuenta que tenga permiso sobre esa carpeta, veran el mismo seguimiento.
- Si tienen permiso de edicion, tambien podran actualizar el estado.

## Requisito OAuth

El Client ID de Google debe tener autorizados los origins donde se usara la app. Como minimo:

- http://localhost:5512
- https://swimpiii.github.io

Si luego el repo final se publica en una ruta concreta de GitHub Pages, esa origin seguira siendo la misma de GitHub Pages.

## Ejecutar en local

```powershell
./iniciar_servidor.ps1
```

O bien:

```powershell
python -m http.server 5512
```

Y abrir:

```text
http://127.0.0.1:5512/index.html
```

## Publicacion

Ya incluye workflow de GitHub Pages en .github/workflows/deploy-pages.yml.

Cuando esta carpeta se suba a su propio repositorio, podras activarlo sin mezclarlo con otras apps.

## Siguientes mejoras posibles

- modo familia de solo lectura con pantalla mas simple
- mapa del dia con puntos del itinerario
- division de gastos por persona
- exportacion CSV o PDF del diario del viaje
