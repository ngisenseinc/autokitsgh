-- Auto Kits GH - Initial Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Suppliers Table
CREATE TABLE suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parts Table
CREATE TABLE parts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    oem_number VARCHAR(100),
    brand VARCHAR(100),
    category VARCHAR(100),
    price_ghs DECIMAL(10, 2) NOT NULL,
    price_usd DECIMAL(10, 2),
    stock_qty INTEGER DEFAULT 0,
    warehouse_location VARCHAR(100),
    supplier_id UUID REFERENCES suppliers(id),
    condition VARCHAR(50) DEFAULT 'New',
    warranty VARCHAR(100),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility Table
CREATE TABLE compatibility (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    part_id UUID REFERENCES parts(id) ON DELETE CASCADE,
    car_brand VARCHAR(100) NOT NULL,
    car_model VARCHAR(100) NOT NULL,
    year_from INTEGER,
    year_to INTEGER,
    engine VARCHAR(100)
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    part_id UUID REFERENCES parts(id),
    qty INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    channel VARCHAR(50) DEFAULT 'WhatsApp',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchase Orders Table
CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    supplier_id UUID REFERENCES suppliers(id),
    status VARCHAR(50) DEFAULT 'Draft',
    total DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PO Items Table
CREATE TABLE po_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
    part_id UUID REFERENCES parts(id),
    qty INTEGER NOT NULL,
    unit_cost DECIMAL(10, 2) NOT NULL
);

-- RLS Policies (Basic setup for demo)
ALTER TABLE parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE po_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to parts and compatibility
CREATE POLICY "Public can view parts" ON parts FOR SELECT USING (true);
CREATE POLICY "Public can view compatibility" ON compatibility FOR SELECT USING (true);

-- Allow authenticated users (sellers) full access
CREATE POLICY "Sellers have full access to parts" ON parts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Sellers have full access to compatibility" ON compatibility FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Sellers have full access to orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Sellers have full access to suppliers" ON suppliers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Sellers have full access to purchase_orders" ON purchase_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Sellers have full access to po_items" ON po_items FOR ALL USING (auth.role() = 'authenticated');

-- Insert some dummy data
INSERT INTO parts (id, name, oem_number, brand, category, price_ghs, price_usd, stock_qty, condition, warranty, description, image_url)
VALUES 
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'Performance Front Bumper', 'BM-5111-G20-P', 'M-Performance', 'Body Kits & Bumpers', 4500.00, 380.00, 12, 'New', '12 Months Ltd', 'Elevate your BMW G20 aesthetics with our high-grade M-Performance style front bumper. Manufactured from premium ABS plastic for durability and precise fitment. Features integrated air ducts and carbon-fiber finish accents.', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800'),
('d290f1ee-6c54-4b01-90e6-d701748f0852', 'Carbon Mirror Caps', 'BM-5116-G20-C', 'M-Performance', 'Body Kits & Bumpers', 850.00, 72.00, 5, 'New', '6 Months', 'Genuine carbon fiber mirror replacement caps for BMW G20.', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800'),
('d290f1ee-6c54-4b01-90e6-d701748f0853', 'G20 Rear Diffuser', 'BM-5112-G20-D', 'M-Performance', 'Body Kits & Bumpers', 1200.00, 100.00, 2, 'New', '12 Months', 'Aggressive rear diffuser for quad exhaust setup.', 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800');

INSERT INTO compatibility (part_id, car_brand, car_model, year_from, year_to, engine)
VALUES 
('d290f1ee-6c54-4b01-90e6-d701748f0851', 'BMW', '3 Series G20', 2019, 2024, 'All'),
('d290f1ee-6c54-4b01-90e6-d701748f0852', 'BMW', '3 Series G20', 2019, 2024, 'All'),
('d290f1ee-6c54-4b01-90e6-d701748f0853', 'BMW', '3 Series G20', 2019, 2024, 'All');
