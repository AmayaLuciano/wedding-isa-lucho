/**
 * Tipos de la lista de regalos. La fuente de datos es una planilla de Google
 * (ver google-apps-script/), consumida a través de /api/regalos.
 */

export type Regalo = {
  id: string;
  nombre: string;
  descripcion: string | null;
  link: string | null;
  imagen: string | null;
  precio: number | null;
  reservado: boolean;
  reservado_por: string | null;
};
