import { pgTable, unique, check, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profile = pgTable("Profile", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	role: text().default('user').notNull(),
}, (table) => [
	unique("Profile_email_unique").on(table.email),
	check("Profile_role_check", sql`role = ANY (ARRAY['admin'::text, 'user'::text])`),
]);
