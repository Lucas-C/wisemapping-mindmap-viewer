CREATE TABLE COLLABORATOR (
id INTEGER NOT NULL IDENTITY,
email varchar(255) NOT NULL,
creation_date date);

CREATE TABLE USER (
id INTEGER NOT NULL IDENTITY,
colaborator_id INTEGER NOT NULL,
username varchar(255)   NOT NULL,
firstname varchar(255)  NOT NULL,
lastname varchar(255)  NOT NULL,
password varchar(255)  NOT NULL,
activationCode BIGINT NOT NULL,
activation_date DATE,
allowSendEmail CHAR(1) NOT NULL,
locale varchar(5),
FOREIGN KEY(colaborator_id) REFERENCES COLLABORATOR(id)
);

CREATE TABLE MINDMAP (
id INTEGER NOT NULL IDENTITY,
title VARCHAR(255) NOT NULL,
description VARCHAR(255)  NOT NULL,
xml LONGVARBINARY NOT NULL,
public BOOLEAN NOT NULL,
creation_date DATETIME,
edition_date DATETIME,
creator_id INTEGER NOT NULL,
tags varchar(1014)  ,
last_editor varchar(255)  ,
--FOREIGN KEY(creator_id) REFERENCES USER(colaborator_id)
);

CREATE TABLE MINDMAP_HISTORY
(id INTEGER NOT NULL IDENTITY,
xml LONGVARBINARY NOT NULL,
mindmap_id INTEGER NOT NULL,
creation_date DATETIME,
creator_user varchar(255));

CREATE TABLE COLLABORATION_PROPERTIES
(id INTEGER NOT NULL IDENTITY,
starred BOOLEAN NOT NULL,
mindmap_properties varchar(512)
);

CREATE TABLE COLLABORATION
(id INTEGER NOT NULL IDENTITY,
colaborator_id INTEGER NOT NULL,
properties_id INTEGER NOT NULL,
mindmap_id INTEGER NOT NULL,
role_id INTEGER NOT NULL,
FOREIGN KEY(colaborator_id) REFERENCES COLLABORATOR(id),
FOREIGN KEY(mindmap_id) REFERENCES MINDMAP(id),
FOREIGN KEY(properties_id) REFERENCES COLLABORATION_PROPERTIES(id)
);


CREATE TABLE TAG
(id INTEGER NOT NULL IDENTITY,
name varchar(255)  NOT NULL,
user_id INTEGER NOT NULL,
--FOREIGN KEY(user_id) REFERENCES USER(colaborator_id)
);

CREATE TABLE ACCESS_AUDITORY (
id INTEGER NOT NULL IDENTITY,
user_id INTEGER NOT NULL,
login_date date,
--FOREIGN KEY(user_id) REFERENCES USER(id)    // Temporally disabled. Exception during first login. Need review..
);

COMMIT;
SHUTDOWN;