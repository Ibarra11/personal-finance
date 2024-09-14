ALTER TABLE "pots" ALTER COLUMN "theme_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "budgets" ADD COLUMN "theme_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budgets" ADD CONSTRAINT "budgets_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "budget_theme_idx" ON "budgets" USING btree ("theme_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_name_unique_index" ON "categories" USING btree (lower("name"));