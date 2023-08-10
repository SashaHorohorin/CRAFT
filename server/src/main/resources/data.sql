CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------users---------------------------------------------
INSERT INTO baseuser (id, created, updated, first_name, last_name, email, phone_number, password, username, status, activation_code, agreement_data_processing, agreement_mailing, lab_id) VALUES
    (uuid_generate_v4(),now(),now(),'Никита', 'Пирогов', 'nikita-pirogov-artur@mail.ru', '8(111)111-11-11', crypt('123', gen_salt('bf',8)), 'nikita', 'ACTIVE', null, true, true, 19439),
    (uuid_generate_v4(),now(),now(),'ADMIN', 'ADMIN', 'admin@mail.ru', '8(999)999-99-99', crypt('123', gen_salt('bf',8)), 'admin', 'ACTIVE', null, true, true, 19369),
    (uuid_generate_v4(),now(),now(),'Sasha', 'Horohorin', 'sashahorohorin5555@gmail.com', '8(999)999-99-12', crypt('123', gen_salt('bf',8)), 'sasha', 'ACTIVE', null, true, true, 19369);
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

-------------------------------trains---------------------------------------------
-- ВЫБОР ОПРЕДЕННОЙ СТРОКИ (SELECT * FROM the_table ORDER BY added DESC LIMIT 1,15)---------------------------------------------
INSERT INTO train (id, created, updated, end_train, start_train, max_participant, now_participant, type, sport_complex) VALUES

    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-7 DAYS',now()+INTERVAL '-7 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-6 DAYS',now()+INTERVAL '-6 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-5 DAYS',now()+INTERVAL '-5 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-4 DAYS',now()+INTERVAL '-4 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-3 DAYS',now()+INTERVAL '-3 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-2 DAYS',now()+INTERVAL '-2 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-1 DAYS',now()+INTERVAL '-1 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+2 DAYS',now()+INTERVAL '+2 DAYS',10,0,'TRAIN_FOR_LOW_SKILL','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+3 DAYS',now()+INTERVAL '+3 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+5 DAYS',now()+INTERVAL '+5 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+6 DAYS',now()+INTERVAL '+6 DAYS',10,0,'GAME','DINAMIT'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+7 DAYS',now()+INTERVAL '+7 DAYS',10,0,'GAME','DINAMIT'),

    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-7 DAYS',now()+INTERVAL '-7 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-6 DAYS',now()+INTERVAL '-6 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-5 DAYS',now()+INTERVAL '-5 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-4 DAYS',now()+INTERVAL '-4 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-4 DAYS',now()+INTERVAL '-4 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-3 DAYS',now()+INTERVAL '-3 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-3 DAYS',now()+INTERVAL '-3 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-2 DAYS',now()+INTERVAL '-2 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-1 DAYS',now()+INTERVAL '-1 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-1 DAYS',now()+INTERVAL '-1 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-1 DAYS',now()+INTERVAL '-1 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+2 DAYS',now()+INTERVAL '+2 DAYS',10,0,'TRAIN_FOR_LOW_SKILL','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+3 DAYS',now()+INTERVAL '+3 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+5 DAYS',now()+INTERVAL '+5 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+6 DAYS',now()+INTERVAL '+6 DAYS',10,0,'GAME','ALEKSEEVA'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+7 DAYS',now()+INTERVAL '+7 DAYS',10,0,'GAME','ALEKSEEVA'),


    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-3 DAYS',now()+INTERVAL '-3 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '-1 DAYS',now()+INTERVAL '-1 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now(),now(),10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+1 DAYS',now()+INTERVAL '+1 DAYS',10,0,'GAME_WITH_TRAINER','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+4 DAYS',now()+INTERVAL '+4 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+5 DAYS',now()+INTERVAL '+5 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+5 DAYS',now()+INTERVAL '+5 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+6 DAYS',now()+INTERVAL '+6 DAYS',10,0,'GAME','IMPULS'),
    (uuid_generate_v4(),now(),now(),now()+INTERVAL '+7 DAYS',now()+INTERVAL '+7 DAYS',10,0,'GAME','IMPULS');

INSERT INTO trainer (id, created, updated, name, photourl, status, text_back, text_front) VALUES
    (uuid_generate_v4(),now(),now(), 'trainer1', 'photoUrl1', 'ACTIVE', 'textBack1', 'textFront1'),
    (uuid_generate_v4(),now(),now(), 'trainer2', 'photoUrl2', 'ACTIVE', 'textBack2', 'textFront2');

INSERT INTO trainer_trains (trainer_id, train_id)
    select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 10);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 11);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 12);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 13);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 14);
-- INSERT INTO trainer_trains (trainer_id, train_id)
--     select t.id, tr.id from trainer t join train tr on (t.name = 'trainer1' and tr.max_participant = 15);

-- INSERT INTO sportsmen_train (sportsmen_id, train_id)
--     select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 11);
-- INSERT INTO sportsmen_train (sportsmen_id, train_id)
--     select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 12);
-- INSERT INTO sportsmen_train (sportsmen_id, train_id)
--     select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 13);
-- INSERT INTO sportsmen_train (sportsmen_id, train_id)
--     select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 14);
-- INSERT INTO sportsmen_train (sportsmen_id, train_id)
--     select u.id, t.id from baseuser u join train t on (u.username = 'nikita' and t.max_participant = 15);
-------------------------------trains---------------------------------------------

-------------------------------News---------------------------------------------
INSERT INTO news (id, created, updated, type, title,text_under_title,main_title, event_date,text_under_date, text, photo_url) VALUES
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title1','underTitle1','Main title 1', now(),'underDate1','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title2','underTitle2','Main title 1', now(),'underDate2','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title3','underTitle3','Main title 1', now(),'underDate3','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title4','underTitle4','Main title 1', now(),'underDate4','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title5','underTitle5','Main title 1', now(),'underDate5','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title6','underTitle6','Main title 1', now(),'underDate6','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title7','underTitle7','Main title 1', now(),'underDate7','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title8','underTitle8','Main title 1', now(),'underDate8','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title9','underTitle9','Main title 1', now(),'underDate9','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title10','underTitle10','Main title 1', now(),'underDate10','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title11','underTitle11','Main title 1', now(),'underDate11','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title12','underTitle12','Main title 1', now(),'underDate12','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title13','underTitle13','Main title 1', now(),'underDate13','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title14','underTitle14','Main title 1', now(),'underDate14','text', 'photoUrl');
-------------------------------News---------------------------------------------
-------------------------------competitions---------------------------------------------
INSERT INTO competition (id, created, updated, sport_complex, type, start_competition, end_competition, max_pair, now_pair,status) VALUES
    (uuid_generate_v4(),now(),now(),'IMPULS','PAIR', now(),now(),10,0, 'ACTIVE'),
    (uuid_generate_v4(),now(),now(),'IMPULS','PAIR', now(),now(),10,0, 'ACTIVE'),
    (uuid_generate_v4(),now(),now(),'IMPULS','PAIR', now(),now(),10,0, 'ACTIVE'),
    (uuid_generate_v4(),now(),now(),'IMPULS','PAIR', now(),now(),10,0, 'ACTIVE');
-------------------------------competitions---------------------------------------------
-------------------------------prices---------------------------------------------
INSERT INTO price (id, created, updated, title, old_price, now_price, discount, text_under_price, sport_complex, active) VALUES
    (uuid_generate_v4(),now(),now(),'цена 1', 100, 90, 10,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 2', 110, 90, 11,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 3', 120, 90, 12,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 4', 130, 90, 13,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 5', 140, 90, 14,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 6', 150, 90, 15,'месяц','IMPULS', true),
    (uuid_generate_v4(),now(),now(),'цена 1', 100, 90, 10,'месяц','ALEKSEEVA', true),
    (uuid_generate_v4(),now(),now(),'цена 2', 110, 90, 11,'месяц','ALEKSEEVA', true),
    (uuid_generate_v4(),now(),now(),'цена 3', 120, 90, 12,'месяц','ALEKSEEVA', true),
    (uuid_generate_v4(),now(),now(),'цена 4', 150, 90, 15,'месяц','ALEKSEEVA', true),
    (uuid_generate_v4(),now(),now(),'цена 1', 100, 90, 10,'месяц','DINAMIT', true),
    (uuid_generate_v4(),now(),now(),'цена 2', 110, 90, 11,'месяц','DINAMIT', true),
    (uuid_generate_v4(),now(),now(),'цена 3', 120, 90, 12,'месяц','DINAMIT', true),
    (uuid_generate_v4(),now(),now(),'цена 4', 150, 90, 15,'месяц','DINAMIT', true),
    (uuid_generate_v4(),now(),now(),'цена 5', 150, 90, 15,'месяц','DINAMIT', true);

-------------------------------prices---------------------------------------------


