import { pusherChannelName, pusherPublish } from "@/app/misc/pusher";
import { SelectBid } from "@/schema";
import { addBid, auctionsMaxBid, getAuction } from "@/services/auction";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

function pushBid(auctionId: number, bid: SelectBid) {
  const channelName = pusherChannelName(auctionId);

  pusherPublish(channelName, "bid", bid);
}

export async function POST(
  req: Request,
  { params }: { params: { id: number } }
) {
  const auctionId = params.id;

  const auction = await getAuction(auctionId);

  if (auction.length === 0) {
    return Response.json({ error: "Auction not found" }, { status: 404 });
  }

  const highestBid = await auctionsMaxBid(auctionId);

  const data = await req.json();

  if (highestBid.length > 0 && highestBid[0].bid >= data.bid) {
    return Response.json(
      { error: "Bid must be higher than current highest bid" },
      { status: 400 }
    );
  }

  const insertData = {
    auctionId: auctionId,
    bid: data.bid,
  };

  const bidData = await addBid(insertData);

  if (bidData.length === 0) {
    return Response.json({ error: "Failed to add bid" }, { status: 500 });
  }

  pushBid(auctionId, bidData[0]);

  return Response.json(bidData);
}
