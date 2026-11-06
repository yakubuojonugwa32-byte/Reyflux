import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables from import.meta.env or process.env
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

// Export Supabase client if keys exist, otherwise null
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  volumeOrWeight: string;
  image: string;
  description: string;
  isPopular?: boolean;
  in_stock?: boolean;
}

export interface SupabaseOrder {
  id: string;
  reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_location: string;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed';
  paystack_reference?: string;
  payment_channel?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    volumeOrWeight: string;
  }>;
  created_at: string;
  paid_at?: string;
}
