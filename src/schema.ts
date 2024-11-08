import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const auctionTable = pgTable("auction", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const bidTable = pgTable("bid", {
  id: serial("id").primaryKey(),
  bid: integer("bid").notNull(),
  emoji: text("emoji"),
  auctionId: integer("auction_id")
    .notNull()
    .references(() => auctionTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export type InsertAuction = typeof auctionTable.$inferInsert;
export type SelectAuction = typeof auctionTable.$inferSelect;
export type InsertBid = typeof bidTable.$inferInsert;
export type SelectBid = typeof bidTable.$inferSelect;
