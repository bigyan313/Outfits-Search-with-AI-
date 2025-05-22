import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Get the current domain, fallback to localhost for development
const domain = window.location.hostname === 'http://adhikari.app'
  ? 'http://localhost:5173'
  : 'https://adhikarishop.netlify.app/';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    autoRefreshToken: true,
    persistSession: true,
    storage: window.localStorage,
    redirectTo: `${domain}/auth/callback`
  }
});