CREATE TABLE "cache" (
	"key" varchar PRIMARY KEY NOT NULL,
	"content" json,
	"expires_at" timestamp
);
