CREATE SEQUENCE channels_id_seq;
CREATE TABLE "public"."channels" (
    "id" int4 NOT NULL DEFAULT nextval('channels_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "isGlobal" bool NOT NULL DEFAULT false,
    "createdAt" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);
INSERT INTO "public"."channels" ("name", "isGlobal", "createdAt")
VALUES ('general', 't', now());
