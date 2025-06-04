ALTER TABLE "shipment_providers" RENAME TO "shipment_carriers";--> statement-breakpoint
ALTER TABLE "shipments" RENAME COLUMN "provider_id" TO "carrier_id";--> statement-breakpoint
ALTER TABLE "shipment_carriers" DROP CONSTRAINT "shipment_providers_label_unique";--> statement-breakpoint
ALTER TABLE "shipments" DROP CONSTRAINT "shipments_provider_id_shipment_providers_id_fk";
--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_carrier_id_shipment_carriers_id_fk" FOREIGN KEY ("carrier_id") REFERENCES "public"."shipment_carriers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment_carriers" ADD CONSTRAINT "shipment_carriers_label_unique" UNIQUE("label");