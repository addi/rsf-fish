"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "../page.module.css";
import { SelectAuction, SelectBid } from "@/schema";
import usePusherBids from "@/app/hooks/usePusher";

export default function Auction({ id }: { id: string }) {
  const [pusherChannel, setPusherChannel] = useState<string>();

  const pusherBids = usePusherBids(pusherChannel);

  const [auction, setAuction] = useState<SelectAuction>();
  const [fetchBids, setFetchBids] = useState<SelectBid[]>([]);

  const bids = useMemo(() => {
    const filteredPusherBids = pusherBids.filter((pusherBid) => {
      return !fetchBids.some((fetchBid) => fetchBid.id === pusherBid.id);
    });

    return [...fetchBids, ...filteredPusherBids];
  }, [fetchBids, pusherBids]);

  const bid = async (id: string, amount: number) => {
    const response = await fetch(`/api/auction/bid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bid: amount }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("response", data);
      console.log("Bid placed!");
    } else {
      console.log("Failed to place bid");
    }
  };

  const onClick = () => {
    const highestBid = Math.max(...bids.map((bid) => bid.bid), 0);
    bid(id, highestBid + 1);
  };

  const fetchAuctions = async (id: string) => {
    const response = await fetch(`/api/auction/${id}`);
    const data = await response.json();
    console.log("Auctions", data);

    setFetchBids(data.bids);
    setAuction(data.auction);
    setPusherChannel(data.pusherChannel);
  };

  useEffect(() => {
    fetchAuctions(id);
  }, [id]);

  return (
    <>
      <h2 className={styles.title}>🐠 {auction ? `${auction.title}` : ""}</h2>
      <button className={styles.button} onClick={onClick}>
        Bid
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid) => (
            <tr key={bid.id}>
              <td>{bid.id}</td>
              <td>{new Date(bid.createdAt).toLocaleString("is-IS")}</td>
              <td>{bid.bid} isk</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
