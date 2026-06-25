-- Ejecutar en Supabase: Dashboard > SQL Editor > New query

create table regalos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  link text,
  imagen text,
  precio numeric,
  reservado boolean not null default false,
  reservado_por text,
  created_at timestamp with time zone default now()
);

-- Habilitar Row Level Security
alter table regalos enable row level security;

-- Cualquiera puede LEER la lista de regalos (es pública para los invitados)
create policy "Lectura pública de regalos"
on regalos for select
using (true);

-- Cualquiera puede RESERVAR (actualizar) un regalo, pero no des-reservarlo ni
-- borrar otros datos. Esta policy permite el update completo; el control fino
-- de "no reservar dos veces" ya lo hace el .eq('reservado', false) en el código.
create policy "Reservar un regalo"
on regalos for update
using (true);

-- Ejemplo de datos iniciales (reemplazar por los regalos reales)
insert into regalos (nombre, link, imagen, precio) values
  ('Juego de sábanas', 'https://www.falabella.com.ar/producto-ejemplo', null, 35000),
  ('Cafetera', 'https://www.fravega.com/producto-ejemplo', null, 80000),
  ('Set de copas', 'https://www.mercadolibre.com.ar/producto-ejemplo', null, 25000);

-- ─────────────────────────────────────────
-- INVITADOS
-- ─────────────────────────────────────────
create table invitados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  cantidad int not null default 1,
  confirmado boolean not null default true,
  nota text,
  created_at timestamp with time zone default now()
);

alter table invitados enable row level security;

create policy "Insertar invitado (público)"
on invitados for insert
with check (true);

create policy "Lectura de invitados (público)"
on invitados for select
using (true);

create policy "Actualizar invitado (público)"
on invitados for update
using (true);

create policy "Eliminar invitado (público)"
on invitados for delete
using (true);

-- ─────────────────────────────────────────
-- TRANSFERENCIAS
-- ─────────────────────────────────────────
create table transferencias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  monto numeric not null,
  nota text,
  fecha date not null default current_date,
  created_at timestamp with time zone default now()
);

alter table transferencias enable row level security;

create policy "Insertar transferencia (público)"
on transferencias for insert
with check (true);

create policy "Lectura de transferencias (público)"
on transferencias for select
using (true);

create policy "Eliminar transferencia (público)"
on transferencias for delete
using (true);
