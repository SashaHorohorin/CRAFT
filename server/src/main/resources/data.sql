CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------users---------------------------------------------
INSERT INTO baseuser (id, created, updated, first_name, last_name, email, phone_number, password, username, status, activation_code, agreement_data_processing, agreement_mailing) VALUES
    (uuid_generate_v4(),now(),now(),'Никита', 'Пирогов', 'nikita@gmail.com', '8(111)111-11-11', crypt('123', gen_salt('bf',8)), 'nikita', 'ACTIVE', null, true, true),
    (uuid_generate_v4(),now(),now(),'ADMIN', 'ADMIN', 'admin@mail.ru', '8(999)999-99-99', crypt('123', gen_salt('bf',8)), 'admin', 'ACTIVE', null, true, true);
INSERT INTO role (id, created, updated, name) VALUES
    (uuid_generate_v4(), now(),now(),'BASE'),
    (uuid_generate_v4(),now(),now(),'ADMIN');
INSERT INTO user_roles (user_id, role_id)
    select u.id, r.id from baseuser u join role r on (u.username = 'nikita' and r.name = 'BASE');
INSERT INTO user_roles (user_id, role_id)
    select u.id, r.id from baseuser u join role r on (u.username = 'admin' and r.name = 'ADMIN');
-------------------------------users---------------------------------------------

-------------------------------trains---------------------------------------------
-- ВЫБОР ОПРЕДЕННОЙ СТРОКИ (SELECT * FROM the_table ORDER BY added DESC LIMIT 1,15)---------------------------------------------
INSERT INTO train (id, created, updated, end_train, start_train, max_participant, now_participant, type) VALUES
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'TRAIN'),
    (uuid_generate_v4(),now(),now(),now(),now(),11,0,'GAME');
--     (uuid_generate_v4(),now(),now(),now(),now(),12,0,'GAME'),
--     (uuid_generate_v4(),now(),now(),now(),now(),13,0,'GAME'),
--     (uuid_generate_v4(),now(),now(),now(),now(),14,0,'GAME');
INSERT INTO trainer (id, created, updated, name, photourl, status, text_back, text_front) VALUES
    (uuid_generate_v4(),now(),now(), 'trainer1', 'photoUrl1', 'ACTIVE', 'textBack1', 'textFront1'),
    (uuid_generate_v4(),now(),now(), 'trainer2', 'photoUrl2', 'ACTIVE', 'textBack2', 'textFront2');
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 10);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 11);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 12);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer2' and tr.max_participant = 13);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer2' and tr.max_participant = 14);
-------------------------------trains---------------------------------------------

-------------------------------пока впадлу писать---------------------------------------------

-------------------------------пока впадлу писать---------------------------------------------