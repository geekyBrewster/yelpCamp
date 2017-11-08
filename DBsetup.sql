CREATE DATABASE "yelpcamp"

CREATE TABLE "campsites" (
  "id" serial primary key,
  "name" varchar(120) not null,
  "image" varchar(200) not null,
  "description" varchar(350) null
);

CREATE TABLE "users" (
  "id" serial primary key,
  "name" varchar(120) not null
);

CREATE TABLE "comments" (
  "id" serial primary key,
  "campsite_id" int references "campsites",
  "author" varchar(120) null,
  "comment" varchar(500) null
);

--Sample Data --
INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Salmon Creek', 'https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg',
'Features two separate creeks which are good for fishing. Modern ammenities.');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Redwood Falls', 'https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg',
'Primitive campsites available. Other campsites feature modern amenities');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Chase River Woods', 'https://farm5.staticflickr.com/4027/4368764673_c8345bd602.jpg',
'Modern amenities. Sites available for pullthrough trailers. Plenty of hiking trails.');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Rice Lake', 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
'Primative campsites only. Water pumps near entrance. Firewood available for purchase.');

INSERT INTO "campsites" ("name", "image", "description")
VALUES ('Granite Hills', 'https://farm4.staticflickr.com/3290/3753652230_8139b7c717.jpg',
'Modern amenities. Wood available for purchase at ranger station. Nearby lake with water access.');

INSERT INTO "comments" ("campsite_id", "author", "comment")
VALUES (1, 'Homer', 'Nice trout fishing here.'),
(2, 'Joe', 'Water pumps near the primitive sites are decent.'),
(3, 'Martha', 'Hiking is good but bring mosquito spray. Lots.'),
(4, 'Homer', 'Nice and quiet campsite. Highly recommended.'),
(5, 'Martha', 'Bring the boat for the lake. It''s nice.'),
(1, 'Joe', 'It gets pretty crowded during July. Offseason is best.'),
(3, 'Hannah', 'Don''t stay near the trailer park. It gets loud.');
