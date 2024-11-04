CREATE TABLE IF NOT EXISTS "auction" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bid" (
	"id" serial PRIMARY KEY NOT NULL,
	"bid" integer NOT NULL,
	"auction_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bid" ADD CONSTRAINT "bid_auction_id_auction_id_fk" FOREIGN KEY ("auction_id") REFERENCES "public"."auction"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
