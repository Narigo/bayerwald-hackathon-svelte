create database bwh_participants;
use bwh_participants;

CREATE TABLE participants
(
    id INTEGER AUTO_INCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    token TEXT,
    team TEXT,
    bio TEXT,
    show_on_page BOOLEAN,
    extras JSON,
    PRIMARY KEY (id)
);
