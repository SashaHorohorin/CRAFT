CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------users---------------------------------------------
INSERT INTO baseuser (id, created, updated, first_name, last_name, email, phone_number, password, username, status, activation_code, agreement_data_processing, agreement_mailing, lab_id,have_first_train) VALUES
(uuid_generate_v4(),now(),now(),'Никита', 'Пирогов', 'nikita-pirogov-artur@mail.ru', '8(111)111-11-11', crypt('123', gen_salt('bf',8)), 'nikita', 'ACTIVE', null, true, true, 19439, false),
(uuid_generate_v4(),now(),now(),'ADMIN', 'ADMIN', 'craftbadmclub@gmail.com', '8(999)999-99-99', crypt('sdfSer54ds', gen_salt('bf',8)), 'admin', 'ACTIVE', null, true, true, 1410, false),
(uuid_generate_v4(),now(),now(),'Sasha', 'Horohorin', 'sashahorohorin5555@gmail.com', '8(999)999-99-12', crypt('123', gen_salt('bf',8)), 'sasha', 'ACTIVE', null, true, true, 19369, false),
(uuid_generate_v4(),now(),now(),'Дмитрий', 'Решетников', 'rdsrdsrds2001@gmail.com', '8(981)112-38-98', crypt('Baltika1', gen_salt('bf',8)), 'dima', 'ACTIVE', null, true, true, 19369, false);
INSERT INTO role (id, created, updated, name) VALUES
(uuid_generate_v4(), now(),now(),'BASE'),
(uuid_generate_v4(),now(),now(),'ADMIN');
INSERT INTO user_roles (user_id, role_id)
select u.id, r.id from baseuser u join role r on (u.username = 'nikita' and r.name = 'BASE');
INSERT INTO user_roles (user_id, role_id)
select u.id, r.id from baseuser u join role r on (u.username = 'sasha' and r.name = 'BASE');
INSERT INTO user_roles (user_id, role_id)
select u.id, r.id from baseuser u join role r on (u.username = 'admin' and r.name = 'ADMIN');
INSERT INTO admin (id)
select u.id from baseuser u where (u.username = 'admin');
-------------------------------users---------------------------------------------

INSERT INTO trainer (id, created, updated, name, photourl, status, text_back, text_front) VALUES
(uuid_generate_v4(),now(),now(), 'Хорохорин Александр', 'https://drive.google.com/uc?export=view&id=1PltSoi-VIF82ZUMjc3s84lToxTDW6OWj', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Решетников Дмитрий', 'https://drive.google.com/uc?export=view&id=1QFqkXq9UDY2_HXAdVfyeRIAzfAHoIv9i', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Бирюков Алексей', 'https://drive.google.com/uc?export=view&id=101lwCsGsnL-YtTDTOvAh3TGn0DxJQRi5', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Умеренкова Анастасия', 'https://drive.google.com/uc?export=view&id=1OMkV5lhuEqAsd59_BMrL3NH5S2kYZDL0', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Иванов Антон', 'https://drive.google.com/uc?export=view&id=16vUE46xeRB1HY8Kc2HMe3KYoD2N9lu5l', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Онегина Ирина', 'https://drive.google.com/uc?export=view&id=128dd4MWeUnkgpgURqlxrPVm_tGGdc6R1', 'ACTIVE', 'textBack1', 'textFront1'),
(uuid_generate_v4(),now(),now(), 'Филиппов Иван', 'https://drive.google.com/uc?export=view&id=', 'ACTIVE', 'textBack1', 'textFront1');
-------------------------------prices---------------------------------------------
INSERT INTO price (id, created, updated, max_trains, old_price, now_price, discount, text_under_price,type, sport_complex, active) VALUES
(uuid_generate_v4(),now(),now(),9, 9200, 7650, 20,'45 дней','DEFAULT','DINAMIT', true),
(uuid_generate_v4(),now(),now(),12, 11500, 9600, 20,'45 дней','DEFAULT','DINAMIT', true),
(uuid_generate_v4(),now(),now(),8, 6750, 5600, 20,'45 дней','CHILDREN','DINAMIT', true),
(uuid_generate_v4(),now(),now(),1, 1100, 950, 15,'45 дней','DEFAULT','DINAMIT', true),
(uuid_generate_v4(),now(),now(),9, 9200, 7650, 20,'45 дней','DEFAULT','IMPULS', true),
(uuid_generate_v4(),now(),now(),1, 1300, 1000, 24,'45 дней','DEFAULT','ALEKSEEVA', true);

-------------------------------prices---------------------------------------------


