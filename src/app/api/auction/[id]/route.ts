import { getAuction, getBidsForAuction } from "@/services/auction";

export async function GET(
  req: Request,
  { params }: { params: { id: number } }
) {
  const auction = await getAuction(params.id);
  const bids = await getBidsForAuction(params.id);

  return Response.json({ auction, bids });
}
