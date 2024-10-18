import Link from "next/link";
import Logo from "@/public/logo-large.svg";
import AuthIllusration from "@/public/illustration-authentication.svg";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col lg:block">
      <header className="flex justify-center rounded-bl-lg rounded-br-lg bg-black px-10 py-6 lg:hidden">
        <Link href="/dashboard">
          <Logo className="text-white" />
          <span className="sr-only">Home</span>
        </Link>
      </header>
      <div className="h-full flex-1 px-4 py-6 lg:flex lg:items-center lg:gap-20 lg:p-5">
        <div className="hidden lg:relative lg:block lg:h-full lg:w-[560px] lg:p-10">
          <AuthIllusration className="absolute bottom-0 left-0 top-0 h-full w-full rounded-xl object-cover" />
          <div className="relative flex h-full flex-col justify-between">
            <Link href="/dashboard">
              <Logo className="text-white" />
              <span className="sr-only">Home</span>
            </Link>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Keep track of your money and save for your future
              </h2>
              <p className="text-sm text-white">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
        <div className="h-full md:flex md:flex-1 md:items-center md:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
