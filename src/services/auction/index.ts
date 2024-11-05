import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { auctionTable, bidTable, InsertAuction, InsertBid } from "@/schema";

export async function getAllAuctions() {
  return db.select().from(auctionTable).orderBy(desc(auctionTable.id));
}

export async function getAuction(id: number) {
  return db.select().from(auctionTable).where(eq(auctionTable.id, id));
}

export async function getBidsForAuction(auctionId: number) {
  return db.select().from(bidTable).where(eq(bidTable.auctionId, auctionId));
}

export async function addAuction(data: InsertAuction) {
  return db.insert(auctionTable).values(data);
}

export async function addBid(data: InsertBid) {
  return db.insert(bidTable).values(data).returning();
}

export async function auctionsMaxBid(auctionId: number) {
  return db
    .select()
    .from(bidTable)
    .where(eq(bidTable.auctionId, auctionId))
    .orderBy(desc(bidTable.bid))
    .limit(1);
}
