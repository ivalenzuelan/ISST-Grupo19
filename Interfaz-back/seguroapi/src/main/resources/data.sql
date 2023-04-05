INSERT INTO SEGURO (id, nombre, tipo_seguro, descripcion, precio, periodicidad, aseguradora) 
VALUES 
  (1000, 'Seguro de hogar', 'Hogar', 'Cubre los daños en el hogar', 100.50, 'Anual', 'AXA'),
  (1001, 'Seguro de coche', 'Auto', 'Cubre los daños en el coche', 200.75, 'Mensual', 'Allianz'),
  (1002, 'Seguro de vida', 'Vida', 'Cubre el fallecimiento del asegurado', 300.00, 'Anual', 'Mapfre'),
  (1003, 'Seguro de salud', 'Salud', 'Cubre los gastos médicos', 150.25, 'Trimestral', 'Sanitas'),
  (1004, 'Seguro de viaje', 'Viajes', 'Cubre los imprevistos en viajes', 50.00, 'Anual', 'Axa'),
  (1005, 'Seguro de responsabilidad civil', 'Vida', 'Cubre los daños a terceros', 80.50, 'Anual', 'Allianz'),
  (1006, 'Seguro de moto', 'Auto', 'Cubre los daños en la moto', 120.00, 'Mensual', 'Mapfre'),
  (1007, 'Seguro de mascotas', 'Vida', 'Cubre los gastos veterinarios', 75.75, 'Anual', 'Sanitas'),
  (1008, 'Seguro de decesos', 'Vida', 'Cubre los gastos funerarios', 200.00, 'Anual', 'AXA'),
  (1009, 'Seguro de comercio', 'Ahorro', 'Cubre los daños en el negocio', 350.50, 'Anual', 'Allianz');


INSERT INTO CLIENTE (id, mail, id_Fiscal, username, nombre, apellidos, password, nacimiento, direccion, telefono)
VALUES 
  (1010, 'pepe@ejemplo.com', '12345678A', 'pepelopez', 'Pepe', 'López', 'miclave', '1990-01-01', 'Calle Mayor 1', '+34 912 345 678'),
  (1011, 'laura@ejemplo.com', '87654321B', 'lauragarcia', 'Laura', 'García', 'miclave', '1995-05-05', 'Calle Cervantes 2', '+34 912 345 679'),
  (1012, 'juan@ejemplo.com', '43215678C', 'juanmartinez', 'Juan', 'Martínez', 'miclave', '1985-12-25', 'Calle Goya 3', '+34 912 345 680'),
  (1013, 'ana@ejemplo.com', '87654321D', 'anaperez', 'Ana', 'Pérez', 'miclave', '2000-08-15', 'Calle Alcalá 4', '+34 912 345 681'),
  (1014, 'carlos@ejemplo.com', '13579246E', 'carlosrodriguez', 'Carlos', 'Rodríguez', 'miclave', '1992-04-30', 'Calle Gran Vía 5', '+34 912 345 682'),
  (1015, 'maria@ejemplo.com', '98765432F', 'mariagonzalez', 'María', 'González', 'miclave', '1998-10-10', 'Calle Princesa 6', '+34 912 345 683'),
  (1016, 'david@ejemplo.com', '12348765G', 'davidfernandez', 'David', 'Fernández', 'miclave', '1980-11-20', 'Calle Bravo Murillo 7', '+34 912 345 684'),
  (1017, 'clara@ejemplo.com', '87651234H', 'clararodriguez', 'Clara', 'Rodríguez', 'miclave', '1996-07-12', 'Calle Paseo de la Castellana 8', '+34 912 345 685'),
  (1018, 'alberto@ejemplo.com', '43218765I', 'albertosanchez', 'Alberto', 'Sánchez', 'miclave', '1993-03-15', 'Calle Serrano 9', '+34 912 345 686'),
  (1019, 'irene@ejemplo.com', '13572468J', 'irenegomez', 'Irene', 'Gómez', 'miclave', '1988-09-05', 'Calle Velázquez 10', '+34 912 345 687');

INSERT INTO POLIZA (id, fecha_inicio, pdf_poliza, periodicidad, precio, fecha_termino, cliente, seguro)
VALUES 
(1, '2023-04-04', null, 'Anual', 100.5, '2024-04-04', 1010, 1000),
(2, '2023-04-04', null, 'Mensual', 200.75, '2023-05-04', 1011, 1001),
(3, '2023-04-04', null, 'Mensual', 200.75, '2023-05-04', 1012, 1002),
(4, '2023-04-04', null, 'Anual', 300.00, '2023-04-04', 1013, 1003),
(5, '2023-04-04', null, 'Trimestral', 150.25, '2023-07-04', 1014, 1004),
(6, '2023-04-04', null, 'Anual', 50.00, '2024-04-04', 1015, 1005),
(7, '2023-04-04', null, 'Anual', 80.50, '2024-04-04', 1016, 1006),
(8, '2023-04-04', null, 'Mensual', 120.00, '2023-05-04', 1017, 1007),
(9, '2023-04-04', null, 'Anual', 75.75, '2024-04-04', 1018, 1008),
(10, '2023-04-04', null, 'Anual', 200.00, '2024-04-04', 1019, 1009);
