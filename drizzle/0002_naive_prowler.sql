CREATE TABLE "shipment_providers" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar(50) NOT NULL,
	"icon" varchar(256),
	CONSTRAINT "shipment_providers_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "shipment_statuses" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar(50) NOT NULL,
	"label" varchar(50) NOT NULL,
	CONSTRAINT "shipment_statuses_key_unique" UNIQUE("key"),
	CONSTRAINT "shipment_statuses_label_unique" UNIQUE("label")
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"tracking_number" varchar(100) NOT NULL,
	"tracking_url" varchar(256),
	"expected_at" timestamp,
	"last_location" varchar(100),
	"last_checked_at" timestamp,
	"thumbnail_url" varchar(256),
	"status_id" integer,
	"provider_id" integer,
	CONSTRAINT "shipments_tracking_number_unique" UNIQUE("tracking_number")
);
--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_status_id_shipment_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."shipment_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_provider_id_shipment_providers_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."shipment_providers"("id") ON DELETE no action ON UPDATE no action;