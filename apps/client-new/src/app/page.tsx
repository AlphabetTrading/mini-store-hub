import styles from "./page.module.css";
import ListUsers from "@/components/listusers";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <ListUsers />
      </div>
    </main>
  );
}
