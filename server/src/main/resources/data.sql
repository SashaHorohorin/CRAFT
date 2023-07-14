CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------users---------------------------------------------
INSERT INTO baseuser (id, created, updated, first_name, last_name, email, phone_number, password, username, status, activation_code, agreement_data_processing, agreement_mailing) VALUES
    (uuid_generate_v4(),now(),now(),'Никита', 'Пирогов', 'nikita-pirogov-artur@mail.ru', '8(111)111-11-11', crypt('123', gen_salt('bf',8)), 'nikita', 'ACTIVE', null, true, true),
    (uuid_generate_v4(),now(),now(),'ADMIN', 'ADMIN', 'admin@mail.ru', '8(999)999-99-99', crypt('123', gen_salt('bf',8)), 'admin', 'ACTIVE', null, true, true);
INSERT INTO role (id, created, updated, name) VALUES
    (uuid_generate_v4(), now(),now(),'BASE'),
    (uuid_generate_v4(),now(),now(),'ADMIN');
INSERT INTO user_roles (user_id, role_id)
    select u.id, r.id from baseuser u join role r on (u.username = 'nikita' and r.name = 'BASE');
INSERT INTO user_roles (user_id, role_id)
    select u.id, r.id from baseuser u join role r on (u.username = 'admin' and r.name = 'ADMIN');
INSERT INTO admin (id)
    select u.id from baseuser u where (u.username = 'admin');
-------------------------------users---------------------------------------------

-------------------------------trains---------------------------------------------
-- ВЫБОР ОПРЕДЕННОЙ СТРОКИ (SELECT * FROM the_table ORDER BY added DESC LIMIT 1,15)---------------------------------------------
INSERT INTO train (id, created, updated, end_train, start_train, max_participant, now_participant, type, sport_complex) VALUES
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'TRAIN','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',11,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+2 DAYS',now()+INTERVAL '+2 DAYS',11,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+3 DAYS',now()+INTERVAL '+3 DAYS',12,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',13,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+5 DAYS',now()+INTERVAL '+5 DAYS',14,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+6 DAYS',now()+INTERVAL '+6 DAYS',15,0,'GAME','ALEKSEEVA');
INSERT INTO trainer (id, created, updated, name, photourl, status, text_back, text_front) VALUES
    (uuid_generate_v4(),now(),now(), 'trainer1', 'photoUrl1', 'ACTIVE', 'textBack1', 'textFront1'),
    (uuid_generate_v4(),now(),now(), 'trainer2', 'photoUrl2', 'ACTIVE', 'textBack2', 'textFront2');
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 10);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 11);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 12);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 13);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 14);
INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 15);

INSERT INTO sportsmen_train (sportsmen_id, train_id)
    select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 11);
INSERT INTO sportsmen_train (sportsmen_id, train_id)
    select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 12);
INSERT INTO sportsmen_train (sportsmen_id, train_id)
    select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 13);
INSERT INTO sportsmen_train (sportsmen_id, train_id)
    select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 14);
INSERT INTO sportsmen_train (sportsmen_id, train_id)
    select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 15);
-------------------------------trains---------------------------------------------

-------------------------------News---------------------------------------------
INSERT INTO news (id, created, updated, type, title,text, photo_url) VALUES
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title1','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title2','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title3','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title4','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title5','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title6','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title7','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title8','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title9','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title10','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title11','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title12','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title13','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title14','text', 'photoUrl');
-------------------------------News---------------------------------------------