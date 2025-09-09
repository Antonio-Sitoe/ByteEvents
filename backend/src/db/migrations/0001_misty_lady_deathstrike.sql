ALTER TABLE "speakers" RENAME COLUMN "event_id" TO "eventId";--> statement-breakpoint
ALTER TABLE "speakers" DROP CONSTRAINT "speakers_event_id_events_id_fk";
--> statement-breakpoint
ALTER TABLE "speakers" ADD CONSTRAINT "speakers_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;