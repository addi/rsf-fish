import { addAuction } from "@/services/auction";

export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

const fishTypes = [
  "Þorskur",
  "Ýsa",
  "Ufsi",
  "Karfi",
  "Lúða",
  "Steinbítur",
  "Kolmunni",
  "Síld",
  "Makríll",
  "Sandkoli",
  "Blálanga",
  "Grálúða",
  "Skarkoli",
  "Hlýri",
  "Langlúra",
  "Kolafiskur",
  "Stórkoli",
  "Marhnútur",
  "Skrápflúra",
  "Hrognkelsi",
];

export async function GET(req: Request) {
  // Here we would check the header to secure the endpoint
  // Make sure it is a cron job

  const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];

  const auctionData = { title: randomFish };

  const auction = await addAuction(auctionData);

  return Response.json(auction);
}
