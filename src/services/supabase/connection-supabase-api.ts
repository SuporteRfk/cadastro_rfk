import { createClient } from '@supabase/supabase-js';

export const schemaDb = import.meta.env.VITE_DB_SCHEMA || "public";
console.log(schemaDb)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabaseApi = createClient(supabaseUrl,supabaseKey, {db: {schema: schemaDb}});