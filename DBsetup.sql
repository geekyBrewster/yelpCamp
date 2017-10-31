CREATE DATABASE "yelpcamp"

CREATE TABLE "campsites" (
  "id" serial primary key,
  "name" varchar(120) not null,
  "image" varchar(200) not null,
)

INSERT INTO "campsites" ("name", "image")
VALUES ('Salmon Creek', 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg');

INSERT INTO "campsites" ("name", "image")
VALUES ('Redwood Falls', 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg');

INSERT INTO "campsites" ("name", "image")
VALUES ('Chase River Woods', 'https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg');

INSERT INTO "campsites" ("name", "image")
VALUES ('Rice Lake', 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg');

INSERT INTO "campsites" ("name", "image")
VALUES ('Granite Hills', 'https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg');
