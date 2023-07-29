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
INSERT INTO news (id, created, updated, type, title,text_under_title,event_date,text_under_date, text, photo_url) VALUES
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title1','underTitle1',now(),'underDate1','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title2','underTitle2',now(),'underDate2','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title3','underTitle3',now(),'underDate3','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title4','underTitle4',now(),'underDate4','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title5','underTitle5',now(),'underDate5','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title6','underTitle6',now(),'underDate6','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title7','underTitle7',now(),'underDate7','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title8','underTitle8',now(),'underDate8','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title9','underTitle9',now(),'underDate9','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title10','underTitle10',now(),'underDate10','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title11','underTitle11',now(),'underDate11','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title12','underTitle12',now(),'underDate12','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title13','underTitle13',now(),'underDate13','text', 'photoUrl'),
    (uuid_generate_v4(),now(),now(), 'BASE_NEWS', 'title14','underTitle14',now(),'underDate14','text', 'photoUrl');
-------------------------------News---------------------------------------------