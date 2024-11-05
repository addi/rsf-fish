import { SelectBid } from "@/schema";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

const usePusherBids = (channelName: string) => {
  const [bids, setBids] = useState<Array<SelectBid>>([]);

  const callback = (data: SelectBid) => {
    console.log("Pusher bid", data);

    setBids((prev) => [...prev, data]);
  };

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "enginn key";

    console.log("Connecting to pusher", key);
    console.log("Channel name", channelName);

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
      cluster: "eu",
    });

    pusher.connection.bind("connected", () => {
      console.log("Connected to pusher");
    });

    const channel = pusher.subscribe(channelName);

    channel.bind("bid", callback);

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [channelName]);

  return bids;
};

export default usePusherBids;
