"use client";

import { useEffect, useState } from "react";
import usePusherBids from "./hooks/usePusher";
import styles from "./page.module.css";
import { SelectAuction } from "@/schema";
import Link from "next/link";

export default function Home() {
  const [auctions, setAuctions] = useState<SelectAuction[]>([]);

  const fetchAuctions = async () => {
    const response = await fetch("/api/auction/");
    const data = await response.json();
    console.log("Auctions", data);

    setAuctions(data);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>🐟 Auctions</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Title</th>
              <th>Current Bid</th>
            </tr>
          </thead>
          <tbody>
            {auctions.map((auction) => (
              <tr key={auction.id}>
                <td>
                  <Link
                    href={`/auction/${auction.id}`}
                    key={auction.id}
                    className={styles.auction}
                  >
                    {auction.id}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/auction/${auction.id}`}
                    key={auction.id}
                    className={styles.auction}
                  >
                    {new Date(auction.createdAt).toLocaleString("is-IS")}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/auction/${auction.id}`}
                    key={auction.id}
                    className={styles.auction}
                  >
                    {auction.title}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/auction/${auction.id}`}
                    key={auction.id}
                    className={styles.auction}
                  >
                    0 isk
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
