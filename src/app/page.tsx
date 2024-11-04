"use client";

import usePusherBids from "./hooks/usePusher";
import styles from "./page.module.css";

export default function Home() {
  const bids = usePusherBids("test");

  console.log("bids", bids);

  const bid = async (id: number) => {
    const response = await fetch(`/api/auction/bid/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bid: 200 }),
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
    bid(2);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>🐟</main>
      <button className={styles.button} onClick={onClick}>
        Bid🐠
      </button>
    </div>
  );
}
