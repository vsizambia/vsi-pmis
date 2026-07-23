import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export const metadata: Metadata = {
  title: "VSI-PMIS",
  description: "Volunteer for Sustainable Initiatives Programme Management Information System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">

          <Sidebar />

          <div className="flex-1 flex flex-col">

            <Topbar />

            <main className="p-8">
              {children}
            </main>

          </div>

        </div>
      </body>
    </html>
  );
}