import "./globals.css";
import { Inter } from "next/font/google";
import Guard from "@/components/Guard";
import { ApolloWrapper } from "@/lib/apollo-provider";
import { NextAuthProvider } from "./providers";
import TopProgressBar from "@/components/TopProgressBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <TopProgressBar /> */}
      <body className={inter.className}>
        <NextAuthProvider>
          <ApolloWrapper>
            <Guard excludedRoutes={["/auth/login", "/auth/reset-password"]}>
              {children}
            </Guard>
          </ApolloWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
