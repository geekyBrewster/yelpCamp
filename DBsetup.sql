CREATE DATABASE "yelpcamp"

CREATE TABLE "campsites" (
  "id" serial primary key,
  "name" varchar(120) not null,
  "image" varchar(200) not null,
  "description" varchar(350) null
)

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Salmon Creek', 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
'Features two separate creeks which are good for fishing');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Redwood Falls', 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg',
'Primative campsites available. Other campsites feature modern amenities');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Chase River Woods', 'https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg',
'Modern amenities. Sites available for pullthrough trailers.');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Rice Lake', 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
'Primative campsites only. Water pumps near entrance.');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Granite Hills', 'https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg',
'Modern amenities. Wood available for purchase at ranger station.');
