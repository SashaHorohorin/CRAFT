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
    lab_id                    int4,
    last_name                 varchar(255) not null,
    password                  varchar(255) not null,
    phone_number              varchar(255) not null,
    photo_url                 varchar(255),
    rating                    int4,
    status                    varchar(255),
    username                  varchar(255),
    primary key (id)
);
create table competition
(
    id                uuid         not null,
    created           timestamp,
    updated           timestamp,
    category          int4,
    end_competition   timestamp,
    info              varchar(1024),
    max_pair          int4         not null,
    now_pair          int4         not null,
    rating_down       int4,
    rating_up         int4,
    sport_complex     varchar(255) not null,
    start_competition timestamp    not null,
    status            varchar(255) not null,
    type              varchar(255) not null,
    primary key (id)
);
create table competition_pair_players
(
    user_id             uuid not null,
    competition_pair_id uuid not null,
    primary key (competition_pair_id, user_id)
);
create table competition_pair_request_to_invite
(
    user_id        uuid not null,
    competition_id uuid not null,
    primary key (competition_id, user_id)
);
create table competition_pair_request_to_join
(
    user_id        uuid not null,
    competition_id uuid not null,
    primary key (competition_id, user_id)
);
create table competition_pair
(
    id             uuid not null,
    created        timestamp,
    updated        timestamp,
    competition_id uuid,
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
    main_title       varchar(255),
    photo_url        varchar(255),
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
    id               uuid    not null,
    created          timestamp,
    updated          timestamp,
    active           boolean not null,
    discount         int4    not null,
    now_price        int4    not null,
    old_price        int4    not null,
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
create index IDXddicqud2uofuxnapfrlv1v5gg on train (id);

