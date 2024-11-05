export const dynamic = "force-dynamic";
export const fetchCache = "default-no-store";

export async function GET(req: Request) {
  return Response.json(process.env);
}
