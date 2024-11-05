import Auction from "@/app/components/auction";
import styles from "../../page.module.css";

export default async function AuctionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const auctionId = (await params).id;

  console.log("Auction ID", auctionId);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Auction id={auctionId} />
      </main>
    </div>
  );
}
