CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO trainer (id, created, updated, name, photourl, status, text_back, text_front) VALUES
(uuid_generate_v4(),now(),now(), 'Синяев Данил', 'without photo', 'ACTIVE', 'textBack1', 'textFront1');

DELETE FROM price where sport_complex = 'IMPULS';

INSERT INTO price (id, created, updated, max_trains, old_price, now_price, discount, text_under_price,type, sport_complex, active) VALUES
(uuid_generate_v4(),now(),now(),1, 1300, 1000, 24,'45 дней','DEFAULT','ARENA300', true);



