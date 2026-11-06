-- Reyflux Enterprises Limited - Supabase Database Schema
-- Run this script in the Supabase SQL Editor to set up products and orders tables

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  volume_or_weight TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  paystack_reference TEXT,
  payment_channel TEXT,
  items JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

-- Allow public insert & select on orders
CREATE POLICY "Allow public insert on orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on orders by reference" ON public.orders
  FOR SELECT USING (true);

-- Seed Initial Products Catalog
INSERT INTO public.products (id, name, category, price, original_price, volume_or_weight, image, description, is_popular, in_stock)
VALUES
  ('palm-oil-4l', 'Pure Organic Red Palm Oil (4L)', 'palm_oil', 14500, 18500, '4 Litres Jerrycan', '/assets/product-palm-oil.png', 'Direct mill unadulterated red palm oil processed in Akwa Ibom/Ondo mills. 100% natural, zero additives.', true, true),
  ('palm-oil-10l', 'Pure Organic Red Palm Oil (10L)', 'palm_oil', 34000, 40000, '10 Litres Jerrycan', '/assets/product-palm-oil.png', 'Heavy duty sealed 10L jerrycan of pure organic red palm oil. Ideal for large households, restaurants and caterers.', true, true),
  ('palm-oil-25l', 'Pure Organic Red Palm Oil (25L)', 'palm_oil', 82000, 95000, '25 Litres Keg', '/assets/product-palm-oil.png', 'Full commercial 25L keg of premium grade red palm oil. Leak-proof cap, high carotene yield.', false, true),
  ('garri-yellow-10kg', 'Crispy Yellow Garri (10kg Bag)', 'garri', 18000, 22000, '10kg Sealed Bag', '/assets/product-garri.png', 'Fine, well-fried crispy yellow garri processed with pure palm oil. Dry, crunchy, non-soggy.', true, true),
  ('garri-yellow-25kg', 'Crispy Yellow Garri (25kg Bag)', 'garri', 34000, 42000, '25kg Woven Bag', '/assets/product-garri.png', 'Commercial 25kg bag of premium yellow garri. Well sieved, long shelf life.', false, true),
  ('garri-yellow-50kg', 'Crispy Yellow Garri (50kg Bag)', 'garri', 66000, 78000, '50kg Full Bag', '/assets/product-garri.png', 'Wholesale 50kg depot bag of yellow garri direct from cassava processing hubs in Edo/Delta.', false, true),
  ('garri-white-25kg', 'Sour White Ijebu Garri (25kg)', 'garri', 38000, 45000, '25kg Woven Bag', '/assets/product-garri.png', 'Sharp sour taste white garri preferred for drinking with cold water, groundnut and milk.', false, true),
  ('cassava-flour-25kg', 'High Quality Cassava Flour (25kg)', 'cassava_flour', 34000, 40000, '25kg Bag', '/assets/product-cassava-flour.png', '100% odorless white cassava flour. Fine mesh for swallow and gluten-free pastries.', true, true),
  ('plantain-flour-25kg', 'Unripe Plantain Flour (25kg Bag)', 'plantain_flour', 28000, 34500, '25kg Bag', '/assets/product-plantain-flour.png', 'Pure green unripe plantain flour. Low glycemic index, ideal for healthy eating.', true, true),
  ('amala-flour-25kg', 'Traditional Amala Yam Flour (25kg)', 'amala_flour', 42000, 49000, '25kg Bag', '/assets/foodstuffs-hires.jpg', 'Dark dried yam flour for traditional Amala. Smooth texture and elastic swallow.', false, true),
  ('groundnut-seeds-10kg', 'Raw Shelled Groundnut Seeds (10kg)', 'groundnut', 21000, 26600, '10kg Bag', '/assets/product-groundnut.png', 'Hand-picked clean raw shelled groundnut seeds. Ready for home boiling or oil pressing.', true, true),
  ('groundnut-jar-2kg', 'Hand-picked Groundnut Jar (2kg)', 'groundnut', 4500, 5800, '2kg Airtight Jar', '/assets/product-groundnut.png', 'Fresh crunchy groundnuts in an airtight seal jar. Great for garri drinking and snacking.', false, true)
ON CONFLICT (id) DO UPDATE SET 
  price = EXCLUDED.price,
  name = EXCLUDED.name,
  description = EXCLUDED.description;
