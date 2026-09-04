CREATE TABLE "account_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"team_member_id" integer,
	"role" text DEFAULT 'member' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"invite_token" text,
	"invite_expires_at" timestamp with time zone,
	"totp_secret" text,
	"totp_enabled" boolean DEFAULT false NOT NULL,
	"email_otp_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "account_users_email_unique" UNIQUE("email"),
	CONSTRAINT "account_users_invite_token_unique" UNIQUE("invite_token")
);
--> statement-breakpoint
CREATE TABLE "blog_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "blog_tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title_en" text NOT NULL,
	"title_pl" text DEFAULT '' NOT NULL,
	"content_en" text DEFAULT '' NOT NULL,
	"content_pl" text DEFAULT '' NOT NULL,
	"excerpt_en" text DEFAULT '' NOT NULL,
	"excerpt_pl" text DEFAULT '' NOT NULL,
	"author" text DEFAULT '8BitJelly' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"cover_emoji" text DEFAULT '🎮' NOT NULL,
	"cover_pattern" text DEFAULT 'pattern-a' NOT NULL,
	"cover_image" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_title" text NOT NULL,
	"image_url" text NOT NULL,
	"alt_text" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description_en" text DEFAULT '' NOT NULL,
	"description_pl" text DEFAULT '' NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"platform" text DEFAULT 'PC' NOT NULL,
	"status" text DEFAULT 'in-dev' NOT NULL,
	"cover_emoji" text DEFAULT '🎮' NOT NULL,
	"cover_pattern" text DEFAULT 'pattern-a' NOT NULL,
	"cover_image" text,
	"itchio_url" text,
	"steam_url" text,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_priority" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "games_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "lookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_en" text NOT NULL,
	"title_pl" text DEFAULT '' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otp_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"account_user_id" integer NOT NULL,
	"code" text NOT NULL,
	"type" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"bio_en" text DEFAULT '' NOT NULL,
	"bio_pl" text DEFAULT '' NOT NULL,
	"roles" text[] DEFAULT '{}' NOT NULL,
	"avatar_emoji" text DEFAULT '🎮' NOT NULL,
	"avatar_image" text,
	"instagram" text,
	"github" text,
	"artstation" text,
	"itchio" text,
	"linkedin" text,
	"twitter" text,
	"youtube" text,
	"tiktok" text,
	"twitch" text,
	"discord" text,
	"bluesky" text,
	"behance" text,
	"website" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account_users" ADD CONSTRAINT "account_users_team_member_id_team_id_fk" FOREIGN KEY ("team_member_id") REFERENCES "public"."team"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "otp_codes" ADD CONSTRAINT "otp_codes_account_user_id_account_users_id_fk" FOREIGN KEY ("account_user_id") REFERENCES "public"."account_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_users_email_idx" ON "account_users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");