create table admin
(
    id uuid not null,
    primary key (id)
);
create table baseuser
(
    id                        uuid         not null,
    created                   timestamp,
    updated                   timestamp,
    activation_code           varchar(255),
    agreement_data_processing boolean      not null,
    agreement_mailing         boolean      not null,
    email                     varchar(255) not null,
    first_name                varchar(255) not null,
    last_name                 varchar(255) not null,
    password                  varchar(255) not null,
    phone_number              varchar(255) not null,
    photo_url                 varchar(255),
    status                    varchar(255),
    username                  varchar(255),
    primary key (id)
);
create table craft_info_card
(
    id          uuid not null,
    created     timestamp,
    updated     timestamp,
    photourl    varchar(255),
    status      varchar(255),
    text_back   varchar(1024),
    text_front  varchar(1024),
    title_back  varchar(255),
    title_front varchar(255),
    author_id   uuid,
    primary key (id)
);
create table news
(
    id               uuid          not null,
    created          timestamp,
    updated          timestamp,
    event_date       timestamp,
    photo_url        varchar(255)  not null,
    text             varchar(2048) not null,
    text_under_date  varchar(255),
    text_under_title varchar(255),
    title            varchar(255)  not null,
    type             varchar(255)  not null,
    primary key (id)
);
create table placemark_on_map
(
    id             uuid   not null,
    created        timestamp,
    updated        timestamp,
    address        varchar(255),
    latitude       float8 not null,
    longitude      float8 not null,
    placemark_text varchar(255),
    text           varchar(255),
    primary key (id)
);
create table price
(
    id               uuid not null,
    created          timestamp,
    updated          timestamp,
    discount         int4 not null,
    now_price        int4 not null,
    old_price        int4 not null,
    sport_complex    varchar(255),
    text_under_price varchar(255),
    title            varchar(255),
    primary key (id)
);
create table role
(
    id      uuid not null,
    created timestamp,
    updated timestamp,
    name    varchar(255),
    primary key (id)
);
create table services_price
(
    id      uuid not null,
    service varchar(255)
);
create table sportsmen_train
(
    sportsmen_id uuid not null,
    train_id     uuid not null,
    primary key (train_id, sportsmen_id)
);
create table train
(
    id              uuid         not null,
    created         timestamp,
    updated         timestamp,
    end_train       timestamp    not null,
    max_participant int4         not null,
    now_participant int4         not null,
    sport_complex   varchar(255) not null,
    start_train     timestamp    not null,
    type            varchar(255) not null,
    primary key (id)
);
create table trainer
(
    id         uuid not null,
    created    timestamp,
    updated    timestamp,
    name       varchar(255),
    photourl   varchar(255),
    status     varchar(255),
    text_back  varchar(255),
    text_front varchar(255),
    primary key (id)
);
create table trainer_trains
(
    trainer_id uuid not null,
    train_id   uuid not null,
    primary key (train_id, trainer_id)
);
create table user_roles
(
    user_id uuid not null,
    role_id uuid not null,
    primary key (user_id, role_id)
);
alter table if exists baseuser
    add constraint UK_pda12xvu7njw7o3it22f12xlu unique (email);
alter table if exists baseuser
    add constraint UK_514h6vkteymeh30q4qwa0a1k8 unique (phone_number);
alter table if exists baseuser
    add constraint UK_4vlvajd6cgpj5kfax34i0wrdm unique (username);
create index IDXddicqud2uofuxnapfrlv1v5gg on train (id);
alter table if exists trainer
    add constraint UK_3vw0xwsb15ggfkna7fn6f6yam unique (name);
alter table if exists admin
    add constraint FKc76wbd1x0jbr9y9dd0ppyd6eu foreign key (id) references baseuser;
alter table if exists craft_info_card
    add constraint FK6ygv4gj28mmxeqhfvq38dgw44 foreign key (author_id) references admin;
alter table if exists services_price
    add constraint FKkgsroal1nvbvkhv5d6352wwu7 foreign key (id) references price;
alter table if exists sportsmen_train
    add constraint FK3qfmk7ih2tqmcnd556j6dwi3r foreign key (train_id) references train;
alter table if exists sportsmen_train
    add constraint FKog7m95940s08lrgtoscpcdsgc foreign key (sportsmen_id) references baseuser;
alter table if exists trainer_trains
    add constraint FKqee0w8n2l7wotewa9pk9n5h23 foreign key (train_id) references train;
alter table if exists trainer_trains
    add constraint FK6olxuspiy934cu13emhsy0svk foreign key (trainer_id) references trainer;
alter table if exists user_roles
    add constraint FKrhfovtciq1l558cw6udg0h0d3 foreign key (role_id) references role;
alter table if exists user_roles
    add constraint FKey0fkj2qh4bppqrxvdr07thu7 foreign key (user_id) references baseuser;
