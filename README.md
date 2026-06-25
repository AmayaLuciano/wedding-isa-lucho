# Boda Isabella y Luciano 💍🌿

Web de invitación con lista de regalos para el casamiento del 14 de marzo de 2026.

Stack: **Next.js 14 + Tailwind CSS + Supabase + Vercel**.

## 1. Instalar dependencias

```bash
npm install
```

## 2. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) → **New project** (es gratis).
2. Una vez creado, ir a **SQL Editor** → pegar el contenido de `supabase/schema.sql` → **Run**.
   Esto crea la tabla `regalos` con sus permisos y carga 3 regalos de ejemplo.
3. Ir a **Project Settings → API** y copiar:
   - `Project URL`
   - `anon public key`

## 3. Variables de entorno

Copiar `.env.example` a `.env.local` y completar con los datos de Supabase:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

## 4. Correr en local

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## 5. Cargar los regalos reales

En Supabase → **Table editor → regalos**, agregar filas a mano con:
- `nombre`: nombre del producto
- `link`: URL al producto (Falabella, Fravega, Mercado Libre, etc.)
- `imagen`: URL de una imagen (opcional)
- `precio`: número (opcional)

`reservado` y `reservado_por` se completan solos cuando alguien reserva desde la web.

## 6. Cómo funciona la reserva

- Cualquier invitado entra a `/regalos`, ve la lista, y al elegir un regalo **debe escribir su nombre** (es obligatorio) para confirmarlo.
- Eso actualiza `reservado = true` y `reservado_por = "nombre"` en Supabase, y el botón cambia a "Reservado por [nombre]" para todos los que visiten la página después.
- Hay una protección básica para que dos personas no reserven el mismo regalo al mismo tiempo (si justo pasa, se les avisa que recarguen la página).

## 7. Deploy en Vercel

1. Subir el proyecto a GitHub (este repo).
2. Entrar a [vercel.com](https://vercel.com) → **Add New Project** → importar el repo.
3. En **Environment Variables**, agregar las mismas dos variables de `.env.local`.
4. Deploy. Listo, queda con una URL pública (se puede conectar un dominio propio después).

## Estructura del proyecto

```
app/
  page.tsx              → Invitación principal
  regalos/page.tsx       → Lista de regalos
  layout.tsx
  globals.css
components/
  Monogram.tsx           → Monograma "IL"
  FloralDivider.tsx       → Separador floral SVG
  Countdown.tsx           → Cuenta regresiva
  RsvpForm.tsx            → Confirmación por WhatsApp
  GiftCard.tsx            → Tarjeta de regalo + lógica de reserva
lib/
  supabase.ts             → Cliente de Supabase
supabase/
  schema.sql              → Script para crear la tabla de regalos
```

## Pendiente / a definir entre los dos

- [ ] Confirmar número de WhatsApp para el RSVP (`components/RsvpForm.tsx`)
- [ ] Cargar los regalos reales en Supabase
- [ ] Decidir si la galería de fotos se agrega como sección nueva
- [ ] Dominio propio (opcional)
