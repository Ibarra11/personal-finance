import DesktopNav from "@/components/DesktopNav";
import TabletMobileNav from "@/components/TabletMobileNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-background lg:flex">
      <div className="hidden lg:block lg:w-64">
        <DesktopNav />
      </div>
      <div className="fixed bottom-0 w-full lg:hidden">
        <TabletMobileNav />
      </div>
      <div className="px-4 py-6 pb-[76px] md:px-10 md:py-8 md:pb-28 lg:flex-1 lg:overflow-auto lg:pb-0">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
