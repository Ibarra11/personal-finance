"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  href: string;
  icon: ReactNode;
}

export default function NavLink({
  children,
  href,
  icon,
}: React.PropsWithChildren<Props>) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      className={`flex min-h-11 items-center justify-center rounded-tl-lg rounded-tr-lg text-xs font-bold md:flex-col md:justify-start md:gap-1 md:pb-3 md:pt-2 lg:flex-row lg:gap-4 lg:rounded-br-xl lg:rounded-tl-none lg:rounded-tr-xl lg:border-b-0 lg:px-8 lg:py-4 lg:text-base ${active ? "border-green border-b-4 bg-background text-gray-900 lg:border-l-4" : ""} `}
      href={href}
    >
      <span className={active ? "text-green" : ""}>{icon}</span>
      {children}
    </Link>
  );
}
