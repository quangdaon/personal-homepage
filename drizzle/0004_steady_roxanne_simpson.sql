ALTER TABLE "shipment_carriers" ADD COLUMN "key" varchar(50);
UPDATE "shipment_carriers" SET "key" = LOWER("label");
ALTER TABLE "shipment_carriers" ALTER COLUMN "key" SET NOT NULL;
ALTER TABLE "shipment_carriers" ADD CONSTRAINT "shipment_carriers_key_unique" UNIQUE("key");