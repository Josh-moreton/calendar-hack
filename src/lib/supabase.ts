/**
 * Supabase Configuration and Initialization
 * Provides authentication services including email/password and social providers
 */

import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
