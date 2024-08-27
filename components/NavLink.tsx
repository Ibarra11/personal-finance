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
  console.log(active);

  return (
    <Link
      className={`flex items-center gap-4 rounded-br-xl rounded-tr-xl px-8 py-4 text-base font-bold ${active ? "bg-background text-gray-900" : ""}`}
      href={href}
    >
      <span className={active ? "text-green" : ""}>{icon}</span>

      {children}
    </Link>
  );
}
