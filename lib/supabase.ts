import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Invitado = {
  id: string;
  nombre: string;
  cantidad: number;
  confirmado: boolean;
  nota: string | null;
  created_at: string;
};

export type Transferencia = {
  id: string;
  nombre: string;
  monto: number;
  nota: string | null;
  fecha: string;
  created_at: string;
};

