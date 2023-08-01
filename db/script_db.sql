# Esquema
CREATE SCHEMA tebanilia;
USE tebanilia;

# Productos y categorías
CREATE TABLE tb_products (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    detalle VARCHAR(45),
    precio DOUBLE(8 , 2) NOT NULL,
    descripcion TEXT NOT NULL,
    PRIMARY KEY (id)
);
  
CREATE TABLE tb_categories (
  id INT NOT NULL AUTO_INCREMENT,
  nombre_cat VARCHAR(45) NOT NULL,
  PRIMARY KEY (id));
  
ALTER TABLE tb_products
ADD COLUMN id_cat INT,
ADD FOREIGN KEY (id_cat)
  REFERENCES tb_categories (id);
  
INSERT INTO tb_categories
(nombre_cat)
VALUES
('Aceites'),
('Acetos'),
('Aceitunas');
  
INSERT INTO tb_products
(nombre,
detalle,
precio,
descripcion,
id_cat)
VALUES
('Blend Sabor Medio',
'Bivarietal Arbequina Picual',
1500.00,
'Es un aceite equilibrado y estable por su alto contenido en ácido oleico y concentración de polifenoles. Se destaca como cualidad la persistencia de su sabor, con un resultado en boca de ligero amargor picante. De aromas delicados, con notas herbáceas, de banana y frutos maduros.
Muy apropiado para potenciar sabores preparados en crudo, ensaladas y cualquier plato que requiera de un sabor intenso con ciertos aromas frutados.',
1),
('Blend Sabor Intenso',
'Bivarietal Arbequina Coratina',
1800.00,
'Aceite de notas verdes y frescas que remiten a los aromas del pasto cortado y la alfalfa. Su frutado se expresa con un suave perfume de manzanas verdes y plátanos. Ligero amargor y picor persistente, en boca se confirman las notas frescas y sutiles dejos de frutos secos.
Complemento perfecto para carnes rojas, quesos duros y pastas al pesto. Sugerencia gourmet: increíbles sensaciones cuando se lo marida con chocolate amargo o pan de membrillo.',
1),
('Apulia',
'Arauco Coratina Picual',
2100.00,
'De las bondades del olivo y su tenacidad, surge Apulia, un blend perfectamente estructurado y lleno de personalidad que incita al catador a recorrer una multitud de matices.
Su frutado se expresa con intensidad media en notas verdes y frutales: hierba recién cortada, alcaucil, almendra, manzana y plátano.
Su amargor y picor de intensidad media ofrecen una sensación de equilibrio que se funde con la frescura de la hierba y la fruta en un final de persistencia agradable.',
1),
('Aceto Balsámico',
'Aceto Balsámico',
1400.00,
'Sutil combinación de vinagres y mosto de uva para evocar las fragancias y sabores que dan fama al aceto balsámico oriundo de Italia. Se perciben notas de sidra, vino y tomates secos. Su acidez, potente y ligera, se equilibra con un dulzor que regala dejos finales de café.
Ideal para aliñar ensaladas de hojas verdes, zanahoria y tomate, incluso macerar peras y manzanas. Es un perfecto complemento para las salsas agridulces que acompañan la carne asada.',
2),

('Aceitunas verdes',
'Premium 00 x460g VIDRIO',
1400.00,
'Aceituna entera.',
3);


# Usuarios
CREATE TABLE tb_users (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    fechaNac DATE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nivelAcceso VARCHAR(45),
    PRIMARY KEY (id)
);

INSERT INTO tb_users
(nombre,
apellido,
fechaNac,
email,
password,
nivelAcceso
)
VALUES
('Administrador', 'Administrador', '1978-10-05', 'admin@tebanilia.com', '123456', 'admin'),
('Esteban', 'Clement', '1978-10-05', 'esteban.clement@gmail.com', '123456', 'client');


