import { getAllAuctions } from "@/services/auction";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(req: Request) {
  const auctions = await getAllAuctions();

  return Response.json(auctions);
}
