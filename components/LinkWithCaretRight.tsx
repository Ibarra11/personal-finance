import Link from "next/link";

import IconCaretRight from "@/public/icons/icon-caret-right.svg";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  className?: string;
}

export default function LinkWithCaretRight({
  href,
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <Button
      className={cn("items-center gap-3 px-0", className)}
      variant="link"
      size="sm"
      asChild
    >
      <Link href={href}>
        {children}
        <IconCaretRight className="size-3" />
      </Link>
    </Button>
  );
}
