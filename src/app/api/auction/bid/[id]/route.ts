import { Lock } from "@upstash/lock";
import { Redis } from "@upstash/redis";

import { pusherChannelName, pusherPublish } from "@/app/misc/pusher";
import { SelectBid } from "@/schema";
import { addBid, auctionsMaxBid, getAuction } from "@/services/auction";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

async function pushBidToWebsocket(auctionId: number, bid: SelectBid) {
  const channelName = pusherChannelName(auctionId);

  await pusherPublish(channelName, "bid", bid);
}

function makeLockId(auctionId: number) {
  let enviromentPrefix = "";

  if (
    process.env.VERCEL_GIT_COMMIT_REF &&
    process.env.VERCEL_GIT_COMMIT_REF != "main"
  ) {
    enviromentPrefix = process.env.VERCEL_GIT_COMMIT_REF + "_";
  }

  return enviromentPrefix + "auction_" + auctionId;
}

const fishEmojis: string[] = [
  "🐟", // Fish
  "🐠", // Tropical Fish
  "🐡", // Blowfish
  "🦈", // Shark
  "🐬", // Dolphin
  "🐳", // Spouting Whale
  "🐋", // Whale
  "🦑", // Squid
  "🐙", // Octopus
  "🦐", // Shrimp
  "🦞", // Lobster
  "🦀", // Crab
  "🦭", // Seal
  "🌊", // Water Wave
];

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const auctionId = params.id;

  const auction = await getAuction(auctionId);

  if (auction.length === 0) {
    return Response.json({ error: "Auction not found" }, { status: 404 });
  }

  const lockId = makeLockId(auctionId);

  const lock = new Lock({
    id: lockId,
    lease: 5000, // Hold the lock for 5 seconds
    redis: Redis.fromEnv(),
    retry: {
      attempts: 10,
      delay: 100,
    },
  });

  if (await lock.acquire()) {
    const data = await req.json();

    const highestBid = await auctionsMaxBid(auctionId);

    if (highestBid.length > 0 && highestBid[0].bid >= data.bid) {
      await lock.release();

      return Response.json(
        { error: "Bid must be higher than current highest bid" },
        { status: 400 }
      );
    }

    const randomEmoji =
      fishEmojis[Math.floor(Math.random() * fishEmojis.length)];

    const insertData = {
      auctionId: auctionId,
      bid: data.bid,
      emoji: randomEmoji,
    };

    const bidData = await addBid(insertData);

    if (bidData.length === 0) {
      await lock.release();

      return Response.json({ error: "Failed to add bid" }, { status: 500 });
    }

    await pushBidToWebsocket(auctionId, bidData[0]);

    await lock.release();

    return Response.json(bidData);
  } else {
    return Response.json({ error: "Failed to acquire lock" }, { status: 500 });
  }
}
