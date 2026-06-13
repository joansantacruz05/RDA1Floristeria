-- ============================================================
--  BASE DE DATOS FLORISTERÍA ANAVICTORIA — Versión 2
--  Actualizado con: Auth de usuarios, pedidos, reseñas,
--  historial de cuenta y 50 productos reales del catálogo
--  Ejecuta TODO esto en el SQL Editor de Supabase
-- ============================================================

-- ─── LIMPIEZA (si ya tenías la versión anterior) ─────────────
DROP TABLE IF EXISTS reseñas          CASCADE;
DROP TABLE IF EXISTS pedido_items     CASCADE;
DROP TABLE IF EXISTS pedidos          CASCADE;
DROP TABLE IF EXISTS pedidos_especiales CASCADE;
DROP TABLE IF EXISTS producto_tags    CASCADE;
DROP TABLE IF EXISTS productos        CASCADE;
DROP TABLE IF EXISTS clientes         CASCADE;

-- ─── 1. CLIENTES (vinculado a Supabase Auth) ─────────────────
CREATE TABLE clientes (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre      TEXT NOT NULL,
  email       TEXT NOT NULL,
  telefono    TEXT,
  creado_en   TIMESTAMPTZ DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.actualizado_en = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_clientes_updated
  BEFORE UPDATE ON clientes
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO clientes (id, nombre, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION crear_perfil_usuario();

-- ─── 2. PRODUCTOS ────────────────────────────────────────────
CREATE TABLE productos (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT          NOT NULL,
  descripcion   TEXT,
  precio        NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  imagen_url    TEXT,
  categoria     TEXT          NOT NULL CHECK (categoria IN ('ramos','detalles')),
  badge         TEXT,
  rating        NUMERIC(2,1)  DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  num_reseñas   INTEGER       DEFAULT 0 CHECK (num_reseñas >= 0),
  activo        BOOLEAN       DEFAULT TRUE,
  creado_en     TIMESTAMPTZ   DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ  DEFAULT NOW()
);

CREATE TRIGGER trigger_productos_updated
  BEFORE UPDATE ON productos
  FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();

CREATE TABLE producto_tags (
  id          SERIAL  PRIMARY KEY,
  producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  tag         TEXT    NOT NULL
);

-- ─── 3. PEDIDOS ──────────────────────────────────────────────
CREATE TABLE pedidos (
  id                SERIAL PRIMARY KEY,
  cliente_id        UUID REFERENCES clientes(id) ON DELETE SET NULL,
  id_local          TEXT,
  estado            TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (estado IN ('pendiente','confirmado','en_camino','entregado','cancelado')),
  total             NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  direccion_entrega TEXT,
  notas             TEXT,
  creado_en         TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pedido_items (
  id              SERIAL  PRIMARY KEY,
  pedido_id       INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id     INTEGER REFERENCES productos(id) ON DELETE SET NULL,
  nombre_producto TEXT    NOT NULL,
  cantidad        INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0),
  imagen_url      TEXT
);

-- ─── 4. RESEÑAS ──────────────────────────────────────────────
CREATE TABLE reseñas (
  id              SERIAL  PRIMARY KEY,
  cliente_id      UUID    REFERENCES clientes(id) ON DELETE SET NULL,
  pedido_id       INTEGER REFERENCES pedidos(id) ON DELETE SET NULL,
  id_local_pedido TEXT,
  producto_id     INTEGER REFERENCES productos(id) ON DELETE SET NULL,
  nombre_producto TEXT    NOT NULL,
  nombre_cliente  TEXT,
  calificacion    INTEGER NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
  comentario      TEXT    NOT NULL CHECK (length(comentario) >= 10),
  creado_en       TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 5. PEDIDOS ESPECIALES ───────────────────────────────────
CREATE TABLE pedidos_especiales (
  id                SERIAL PRIMARY KEY,
  cliente_id        UUID REFERENCES clientes(id) ON DELETE SET NULL,
  ocasion           TEXT,
  presupuesto       TEXT,
  flores_preferidas TEXT,
  colores           TEXT,
  descripcion       TEXT,
  fecha_evento      DATE,
  nombre_contacto   TEXT,
  telefono_contacto TEXT,
  email_contacto    TEXT,
  estado            TEXT NOT NULL DEFAULT 'recibido'
                    CHECK (estado IN ('recibido','en_revision','cotizado','confirmado','completado','cancelado')),
  precio_cotizado   NUMERIC(10,2),
  notas_internas    TEXT,
  creado_en         TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 6. SEGURIDAD (RLS) ──────────────────────────────────────
ALTER TABLE clientes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos         ENABLE ROW LEVEL SECURITY;
ALTER TABLE producto_tags     ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedido_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reseñas           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos_especiales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "productos_lectura_publica"
  ON productos FOR SELECT USING (activo = TRUE);

CREATE POLICY "tags_lectura_publica"
  ON producto_tags FOR SELECT USING (TRUE);

CREATE POLICY "reseñas_lectura_publica"
  ON reseñas FOR SELECT USING (TRUE);

CREATE POLICY "reseñas_insertar_autenticado"
  ON reseñas FOR INSERT
  WITH CHECK (auth.uid() = cliente_id);

CREATE POLICY "clientes_propio_perfil"
  ON clientes FOR ALL
  USING (auth.uid() = id);

CREATE POLICY "pedidos_propios"
  ON pedidos FOR ALL
  USING (auth.uid() = cliente_id);

CREATE POLICY "pedido_items_propios"
  ON pedido_items FOR ALL
  USING (
    pedido_id IN (
      SELECT id FROM pedidos WHERE cliente_id = auth.uid()
    )
  );

CREATE POLICY "ped_especiales_insertar"
  ON pedidos_especiales FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "ped_especiales_propios"
  ON pedidos_especiales FOR SELECT
  USING (auth.uid() = cliente_id OR cliente_id IS NULL);

-- ─── 7. ÍNDICES ───────────────────────────────────────────────
CREATE INDEX idx_productos_categoria   ON productos(categoria);
CREATE INDEX idx_productos_activo      ON productos(activo);
CREATE INDEX idx_pedidos_cliente       ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_estado        ON pedidos(estado);
CREATE INDEX idx_pedido_items_pedido   ON pedido_items(pedido_id);
CREATE INDEX idx_reseñas_producto      ON reseñas(producto_id);
CREATE INDEX idx_reseñas_cliente       ON reseñas(cliente_id);
CREATE INDEX idx_reseñas_pedido        ON reseñas(pedido_id);
CREATE INDEX idx_ped_esp_cliente       ON pedidos_especiales(cliente_id);
CREATE INDEX idx_producto_tags_prod    ON producto_tags(producto_id);

-- ─── 8. DATOS: 50 PRODUCTOS ───────────────────────────────────
INSERT INTO productos (nombre, descripcion, precio, categoria, badge, rating, num_reseñas) VALUES
-- ── RAMOS (30) ──
('Ramo Rosas Rosadas',      'Rosas rosadas frescas del día en tonos suaves y elegantes. Incluye envoltorio artesanal y lazo de organza.',                                          15.00, 'ramos', 'Más vendido',    4.9, 128),
('Ramo de Girasoles',       'Girasoles frescos y vibrantes con eucalipto y gypsophila. Pura alegría ecuatoriana.',                                                                12.00, 'ramos', 'Nueva llegada',  4.7,  89),
('Ramo Primaveral Mixto',   'Un mix explosivo de flores de temporada: tulipanes, anémonas, ranúnculos, narcisos e iris.',                                                          18.00, 'ramos', NULL,            4.8,  74),
('Ramo de Tulipanes',       'Tulipanes frescos en tonos pastel que llenan de color cualquier espacio.',                                                                             16.00, 'ramos', 'Temporada',      4.8,  61),
('Ramo de Peonías',         'Las peonías más exuberantes de nuestra temporada. Voluminosas, fragantes y absolutamente irresistibles.',                                             28.00, 'ramos', 'Premium',        4.9,  47),
('Ramo Lavanda y Eucalipto','Combinación aromática de lavanda silvestre y ramas de eucalipto.',                                                                                    13.00, 'ramos', NULL,            4.6,  38),
('Ramo de Lirios Blancos',  'Delicados lirios blancos con su aroma característico.',                                                                                               19.00, 'ramos', NULL,            4.7,  53),
('Ramo Rosas Blancas Pureza','Rosas blancas de tallo largo que simbolizan pureza y nuevos comienzos.',                                                                             24.00, 'ramos', NULL,            4.9, 115),
('Ramo de Orquídeas',       'Orquídeas exóticas en tonos blancos y morados.',                                                                                                      35.00, 'ramos', 'Exclusivo',      5.0,  42),
('Ramo de Hortensias',      'Hortensias voluminosas en tonos azules, lilas y rosas.',                                                                                             22.00, 'ramos', NULL,            4.8,  67),
('Ramo de Ranúnculos',      'Ranúnculos en tonos pastel: melocotón, crema y rosa.',                                                                                               20.00, 'ramos', 'Tendencia',      4.9,  55),
('Ramo de Dalias Rojas',    'Dalias rojas de gran tamaño con un impacto visual increíble.',                                                                                       26.00, 'ramos', NULL,            4.8,  39),
('Ramo de Crisantemos',     'Crisantemos blancos y amarillos con follaje verde intenso.',                                                                                         14.00, 'ramos', NULL,            4.5,  82),
('Ramo de Alstroemeria',    'Alstroemerias en colores vivos: naranja, amarillo y rosa.',                                                                                          11.00, 'ramos', 'Económico',      4.6,  94),
('Ramo de Lisianthus',      'Lisianthus blancos y morados, también conocidos como la rosa del pobre por su elegancia.',                                                            18.00, 'ramos', NULL,            4.7,  48),
('Ramo de Magnolias',       'Magnolias blancas con sus grandes pétalos aterciopelados.',                                                                                           32.00, 'ramos', 'Premium',        4.9,  31),
('Ramo de Anémonas',        'Anémonas de centro negro en tonos blancos, lilas y rosas.',                                                                                           19.00, 'ramos', NULL,            4.7,  44),
('Ramo de Calas',           'Calas blancas de tallo largo, símbolo de elegancia y sofisticación.',                                                                                27.00, 'ramos', 'Para novias',    5.0,  36),
('Ramo de Gypsophila',      'Gypsophila pura, también conocida como nube o velo de novia.',                                                                                       10.00, 'ramos', NULL,            4.4,  71),
('Ramo Flor de Cerezo',     'Flores de cerezo importadas, el sakura japonés en tu hogar.',                                                                                         30.00, 'ramos', 'Importado',      5.0,  28),
('Ramo de Iris Morados',    'Iris morados de tallo largo con su forma característica.',                                                                                            16.00, 'ramos', NULL,            4.6,  52),
('Ramo de Proteas',         'Proteas exóticas del sur de África. Flores únicas que duran semanas.',                                                                                38.00, 'ramos', 'Exótico',        4.9,  23),
('Ramo Rosas Coral',        'Rosas en tono coral, entre el rosa y el naranja.',                                                                                                    22.00, 'ramos', 'Tendencia',      4.8,  61),
('Ramo Rosas Naranjas',     'Rosas naranjas de tallo largo que transmiten energía y alegría.',                                                                                     20.00, 'ramos', NULL,            4.7,  57),
('Ramo Tropical Mixto',     'Un mix de flores tropicales: heliconias, aves del paraíso, anturios.',                                                                                25.00, 'ramos', '¡Nuevo!',        4.8,  19),
('Ramo de Amapolas',        'Amapolas silvestres en tonos rojos, naranjas y blancos.',                                                                                            17.00, 'ramos', 'Silvestre',      4.7,  34),
('Ramo de Fresias',         'Fresias en colores pastel con su aroma dulce y penetrante.',                                                                                         15.00, 'ramos', 'Aromático',      4.8,  46),
('Ramo Rosas Rojas Pasión', 'El clásico que nunca falla. 12 rosas rojas de tallo largo.',                                                                                         22.00, 'ramos', 'Edición especial',5.0, 203),
('Ramo de Gerberas',        'Gerberas de colores vivos: rojo, naranja, amarillo y rosa.',                                                                                         13.00, 'ramos', NULL,            4.6,  78),
('Ramo de Claveles',        'Claveles bicolores en tonos rojos y blancos.',                                                                                                        9.00, 'ramos', 'Clásico',        4.4,  112),
-- ── DETALLES (20) ──
('Ramo + Globos Corazón',   'Rosas lilas con globos metálicos corazón en rosa y dorado.',                                                                                          45.00, 'detalles', '¡Nuevo!',         5.0,  12),
('Ramo + Osito de Peluche', 'Ramo de rosas coloridas combinado con un tierno osito de peluche.',                                                                                  29.00, 'detalles', 'Combo especial',  4.9,  94),
('Ramo + Chocolates Ferrero','Ramo de flores frescas con una caja de chocolates Ferrero Rocher.',                                                                                 38.00, 'detalles', NULL,             4.7,  71),
('Ramo + Chocolates Lindor', 'Rosas con caja de trufas Lindor de chocolate blanco.',                                                                                               36.00, 'detalles', NULL,             4.8,  58),
('Ramo + Globo Feliz Día',  'Ramo de flores con globo gigante personalizado con el mensaje que quieras.',                                                                         32.00, 'detalles', 'Personalizable',  4.8,  52),
('Ramo + Vino Cabernet',    'Rosas rojas elegantes con una botella de vino Cabernet Sauvignon premium.',                                                                           55.00, 'detalles', 'Lujo',            4.9,  29),
('Ramo + Champagne',        'Flores blancas y doradas con una botella de champagne.',                                                                                             65.00, 'detalles', 'Premium',         5.0,  17),
('Ramo + Tarjeta Regalo',   'Tu ramo favorito acompañado de una tarjeta regalo personalizada.',                                                                                    25.00, 'detalles', NULL,             4.6,  83),
('Caja Sorpresa Floral',    'Una caja artesanal llena de flores mixtas con sorpresas escondidas entre los pétalos.',                                                              42.00, 'detalles', 'Exclusivo',       4.9,  38),
('Ramo + Vela Aromática',   'Flores frescas acompañadas de una vela aromática artesanal.',                                                                                         30.00, 'detalles', NULL,             4.7,  45),
('Ramo + Canasta de Snacks','Flores con una canasta de snacks gourmet seleccionados.',                                                                                             58.00, 'detalles', 'Gourmet',         4.8,  22),
('Ramo + Marco de Fotos',   'Ramo de flores con un marco de fotos artesanal.',                                                                                                     35.00, 'detalles', NULL,             4.6,  41),
('Ramo + Collar Corazón',   'Flores con un delicado collar de plata con colgante de corazón.',                                                                                     48.00, 'detalles', 'Romántico',       5.0,  26),
('Ramo + Taza Personalizada','Flores con una taza de cerámica personalizada.',                                                                                                     28.00, 'detalles', 'Personalizable',  4.7,  63),
('Ramo Rosas Rojas + Osito','12 rosas rojas de tallo largo con un osito de peluche premium.',                                                                                     42.00, 'detalles', 'San Valentín',    5.0,  87),
('Caja de Rosas Premium',   'Una caja elegante con 24 rosas seleccionadas a mano en colores a tu elección.',                                                                       55.00, 'detalles', 'Lujo',            5.0,  43),
('Arreglo Bodas Blanco',    'Arreglo floral en tonos blancos y verdes para bodas y eventos formales.',                                                                             65.00, 'detalles', 'Exclusivo',       4.8,  29),
('Ramo de Novia Clásico',   'Ramo de novia tradicional en blanco y verde. Hecho a medida.',                                                                                        75.00, 'detalles', 'Para novias',     5.0,  34),
('Centro de Mesa Floral',   'Un centro de mesa que hace que cualquier celebración sea especial.',                                                                                  32.00, 'detalles', NULL,             4.7,  38),
('Orquídea en Maceta',      'Una orquídea hermosa que dura semanas si la cuidas bien.',                                                                                            25.00, 'detalles', 'Larga duración',  4.9,  67);

-- ─── 9. TAGS DE PRODUCTOS ─────────────────────────────────────
INSERT INTO producto_tags (producto_id, tag) VALUES
(1,'rosas'),(1,'romántico'),(1,'cumpleaños'),(1,'regalo'),
(2,'girasoles'),(2,'alegría'),(2,'regalo'),(2,'cumpleaños'),
(3,'mixto'),(3,'primavera'),(3,'colorido'),(3,'regalo'),
(4,'tulipanes'),(4,'colorido'),(4,'regalo'),(4,'primavera'),
(5,'peonías'),(5,'romántico'),(5,'cumpleaños'),(5,'aniversario'),
(6,'lavanda'),(6,'aromático'),(6,'hogar'),(6,'decoración'),
(7,'lirios'),(7,'blanco'),(7,'elegante'),(7,'bodas'),
(8,'rosas blancas'),(8,'bodas'),(8,'pureza'),(8,'aniversario'),
(9,'orquídeas'),(9,'exótico'),(9,'elegante'),(9,'regalo'),
(10,'hortensias'),(10,'romántico'),(10,'colorido'),(10,'regalo'),
(11,'ranúnculos'),(11,'pastel'),(11,'elegante'),(11,'cumpleaños'),
(12,'dalias'),(12,'romántico'),(12,'aniversario'),(12,'regalo'),
(13,'crisantemos'),(13,'clásico'),(13,'regalo'),(13,'cumpleaños'),
(14,'alstroemeria'),(14,'colorido'),(14,'alegría'),(14,'económico'),
(15,'lisianthus'),(15,'elegante'),(15,'romántico'),(15,'regalo'),
(16,'magnolias'),(16,'elegante'),(16,'sofisticado'),(16,'regalo'),
(17,'anémonas'),(17,'silvestre'),(17,'romántico'),(17,'cumpleaños'),
(18,'calas'),(18,'bodas'),(18,'elegante'),(18,'pureza'),
(19,'gypsophila'),(19,'bodas'),(19,'romántico'),(19,'delicado'),
(20,'cerezo'),(20,'japonés'),(20,'primavera'),(20,'regalo'),
(21,'iris'),(21,'morado'),(21,'elegante'),(21,'regalo'),
(22,'proteas'),(22,'exótico'),(22,'único'),(22,'decoración'),
(23,'rosas coral'),(23,'romántico'),(23,'tendencia'),(23,'regalo'),
(24,'rosas naranjas'),(24,'alegría'),(24,'cumpleaños'),(24,'regalo'),
(25,'tropical'),(25,'colorido'),(25,'exótico'),(25,'alegría'),
(26,'amapolas'),(26,'silvestre'),(26,'romántico'),(26,'regalo'),
(27,'fresias'),(27,'aromático'),(27,'pastel'),(27,'regalo'),
(28,'rosas rojas'),(28,'amor'),(28,'aniversario'),(28,'romántico'),
(29,'gerberas'),(29,'colorido'),(29,'alegría'),(29,'cumpleaños'),
(30,'claveles'),(30,'clásico'),(30,'regalo'),(30,'cumpleaños'),
(31,'globos'),(31,'romántico'),(31,'cumpleaños'),(31,'aniversario'),
(32,'osito'),(32,'cumpleaños'),(32,'regalo'),(32,'romántico'),
(33,'chocolates'),(33,'romántico'),(33,'regalo'),(33,'cumpleaños'),
(34,'chocolates'),(34,'elegante'),(34,'romántico'),(34,'regalo'),
(35,'globo'),(35,'cumpleaños'),(35,'regalo'),(35,'personalizado'),
(36,'vino'),(36,'romántico'),(36,'cena'),(36,'aniversario'),
(37,'champagne'),(37,'bodas'),(37,'celebración'),(37,'lujo'),
(38,'tarjeta'),(38,'personalizado'),(38,'regalo'),(38,'sencillo'),
(39,'caja'),(39,'sorpresa'),(39,'artesanal'),(39,'regalo'),
(40,'vela'),(40,'aromático'),(40,'romántico'),(40,'hogar'),
(41,'snacks'),(41,'gourmet'),(41,'regalo'),(41,'original'),
(42,'marco'),(42,'recuerdo'),(42,'regalo'),(42,'artesanal'),
(43,'collar'),(43,'romántico'),(43,'joya'),(43,'aniversario'),
(44,'taza'),(44,'personalizado'),(44,'regalo'),(44,'cumpleaños'),
(45,'rosas rojas'),(45,'osito'),(45,'san valentín'),(45,'romántico'),
(46,'caja'),(46,'rosas'),(46,'lujo'),(46,'regalo'),
(47,'bodas'),(47,'blanco'),(47,'elegante'),(47,'decoración'),
(48,'bodas'),(48,'novia'),(48,'blanco'),(48,'elegante'),
(49,'centro de mesa'),(49,'bodas'),(49,'decoración'),(49,'eventos'),
(50,'orquídea'),(50,'planta'),(50,'hogar'),(50,'decoración');
