import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const hasCredentials = Boolean(supabaseUrl && supabaseAnonKey);

if (!hasCredentials) {
  console.error(
    "Faltan variables de entorno VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. " +
      "Crea un archivo .env en la raíz del proyecto con esos valores."
  );
}

export const supabase = hasCredentials
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;
