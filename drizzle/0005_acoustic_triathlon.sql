ALTER TABLE "shipments" RENAME COLUMN "expected_at" TO "delivery_window_end";--> statement-breakpoint
ALTER TABLE "shipment_statuses" ADD COLUMN "is_final" boolean NOT NULL default false;--> statement-breakpoint
ALTER TABLE "shipments" ADD COLUMN "delivery_window_start" timestamp;