ALTER TABLE "bid" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "bid" ADD COLUMN "updated_at" timestamp NOT NULL;