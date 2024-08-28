"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, SVGProps } from "react";

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
      className={`flex flex-col items-center gap-1 rounded-tl-lg rounded-tr-lg pb-3 pt-2 text-xs font-bold lg:flex-row lg:gap-4 lg:rounded-br-xl lg:rounded-tr-xl lg:border-b-0 lg:px-8 lg:py-4 lg:text-base ${active ? "border-green border-b-4 bg-background text-gray-900" : ""} `}
      href={href}
    >
      <span className={active ? "text-green" : ""}>{icon}</span>
      {children}
    </Link>
  );
}
