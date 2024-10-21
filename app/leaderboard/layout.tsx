import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TWEETLE",
  description: "Created with love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}