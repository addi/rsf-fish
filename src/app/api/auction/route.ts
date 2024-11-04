import { getAllAuctions } from "@/services/auction";

export async function GET(req: Request) {
  const auctions = await getAllAuctions();

  return Response.json(auctions);
}
