import Pusher from "pusher";

export function pusherChannelName(auctionId: number) {
  let enviromentPrefix = "";

  if (
    process.env.VERCEL_GIT_COMMIT_REF &&
    process.env.VERCEL_GIT_COMMIT_REF != "main"
  ) {
    enviromentPrefix = process.env.VERCEL_GIT_COMMIT_REF + "_";
  }

  return enviromentPrefix + "auction_" + auctionId;
}

export async function pusherPublish(
  channel: string,
  event: string,
  data: object
) {
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: "eu",
    useTLS: true,
  });

  await pusher.trigger(channel, event, data);
}
