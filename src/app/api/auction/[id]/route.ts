import { pusherChannelName } from "@/app/misc/pusher";
import {
  auctionsMaxBid,
  getAuction,
  getBidsForAuction,
} from "@/services/auction";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const auction = await getAuction(params.id);
  const bids = await getBidsForAuction(params.id);
  const highestBid = await auctionsMaxBid(params.id);

  if (auction.length === 0) {
    return Response.json({ error: "Auction not found" }, { status: 404 });
  }

  const pusherChannel = pusherChannelName(params.id);

  return Response.json({ auction: auction[0], bids });
}
