"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      <button onClick={() => signOut()}>Logout</button>
      <div>user is logged in</div>
      <p className="">{JSON.stringify(session, null, 2)}</p>
    </main>
  );
}
