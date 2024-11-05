import { SelectBid } from "@/schema";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

const usePusherBids = (channelName: string) => {
  const [bids, setBids] = useState<Array<SelectBid>>([]);

  const callback = (data: SelectBid) => {
    setBids((prev) => [...prev, data]);
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
      cluster: "eu",
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
