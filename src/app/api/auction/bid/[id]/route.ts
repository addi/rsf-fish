import { addBid, auctionsMaxBid, getAuction } from "@/services/auction";
import Pusher from "pusher";

function pushBid(auctionId: number, bid: number) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "eu",
    useTLS: true,
  });

  pusher.trigger(`auction_${auctionId}`, "bid", bid);
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

  const response = await addBid(insertData);

  pushBid(auctionId, data.bid);

  return Response.json(response);
}
