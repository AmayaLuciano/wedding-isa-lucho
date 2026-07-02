# Lista de regalos desde Google Sheets

La lista de regalos se administra desde una planilla de Google. La web la lee (y
escribe las reservas) a través de un pequeño Web App de Google Apps Script.

## 1. Crear la planilla

1. Creá una planilla nueva en [sheets.google.com](https://sheets.google.com).
2. Renombrá la pestaña a **`Regalos`** (abajo a la izquierda).
3. En la **fila 1** poné estos encabezados, exactamente en este orden:

   | id | nombre | descripcion | link | imagen | precio | reservado | reservado_por |
   |----|--------|-------------|------|--------|--------|-----------|---------------|

4. Cargá los regalos (un renglón por regalo). Reglas:
   - **id**: un número o texto único por regalo (1, 2, 3…). No lo cambies una vez publicado.
   - **precio**: solo el número, sin `$` ni puntos (ej: `789999`). Puede quedar vacío.
   - **imagen**: URL de una imagen (opcional).
   - **reservado / reservado_por**: dejalos **vacíos**. Se completan solos cuando alguien reserva.

## 2. Agregar el script

1. En la planilla: **Extensiones → Apps Script**.
2. Borrá lo que haya y pegá el contenido de [`Codigo.gs`](./Codigo.gs).
3. Guardá (💾).

## 3. Publicar como Web App

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Tipo (ícono de engranaje) → **Aplicación web**.
3. Configurá:
   - **Ejecutar como**: Yo (tu cuenta).
   - **Quién tiene acceso**: **Cualquier usuario**.
4. **Implementar** → autorizá los permisos que pida.
5. Copiá la **URL de la aplicación web** (termina en `/exec`).

## 4. Conectar con la web

Pasale esa URL a Luciano / ponela en las variables de entorno como:

```
GIFTS_SHEET_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

- En local: en `.env.local`.
- En Vercel: **Settings → Environment Variables**.

## Para editar la lista después

Editás la planilla y listo — la web toma los cambios al instante (sin re-deploy).
Si agregás columnas nuevas o cambiás el código del script, ahí sí tenés que volver a
**Implementar → Administrar implementaciones → Editar → Nueva versión**.
