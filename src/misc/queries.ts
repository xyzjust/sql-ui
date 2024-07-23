export const EXAMPLE_QUERY = `CREATE TABLE test_table (name TEXT, age INT);
INSERT INTO test_table (name, age) VALUES ('Alice', 30);
INSERT INTO test_table (name, age) VALUES ('Bob', 25);
SELECT * FROM test_table;`;


export const INITIAL_QUERY = `
-- Drop the table if it already exists
DROP TABLE IF EXISTS cakes;

-- Create the cakes table
CREATE TABLE cakes (
    cake_id INT PRIMARY KEY null,     -- Auto-incrementing primary key
    name VARCHAR(100) NOT NULL,                 -- Name of the cake, cannot be null
    flavor VARCHAR(50) NOT NULL,                -- Flavor of the cake, cannot be null
    price DECIMAL(10, 2) CHECK (price > 0),     -- Price of the cake, must be greater than 0
    quantity_in_stock INT CHECK (quantity_in_stock >= 0) -- Quantity in stock, must be non-negative
    -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the record was created
    -- updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- ON UPDATE CURRENT_TIMESTAMP -- Timestamp of the last update
);

-- Insert some sample data into the cakes table
INSERT INTO cakes (name, flavor, price, quantity_in_stock)
VALUES 
    ('Chocolate Cake', 'Chocolate', 25.00, 10),
    ('Vanilla Cake', 'Vanilla', 20.00, 5),
    ('Red Velvet Cake', 'Red Velvet', 30.00, 7),
    ('Lemon Cake', 'Lemon', 22.50, 8),
    ('Carrot Cake', 'Carrot', 24.00, 6),
    ('Cheesecake', 'Cheese', 28.00, 4),
    ('Strawberry Cake', 'Strawberry', 26.00, 9),
    ('Black Forest Cake', 'Chocolate', 32.00, 5),
    ('Mango Cake', 'Mango', 27.50, 3),
    ('Blueberry Cake', 'Blueberry', 29.00, 2),
    ('Pineapple Cake', 'Pineapple', 23.00, 8),
    ('Coffee Cake', 'Coffee', 25.50, 7),
    ('Marble Cake', 'Chocolate and Vanilla', 24.50, 6),
    ('Coconut Cake', 'Coconut', 21.00, 4),
    ('Almond Cake', 'Almond', 28.50, 5),
    ('Banana Cake', 'Banana', 22.00, 10),
    ('Raspberry Cake', 'Raspberry', 30.50, 2),
    ('Orange Cake', 'Orange', 23.50, 3),
    ('Peach Cake', 'Peach', 27.00, 4),
    ('Mint Chocolate Cake', 'Mint Chocolate', 31.00, 6);

-- Select all data from the cakes table to verify the insertions
-- SELECT * FROM cakes;
`;