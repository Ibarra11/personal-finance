import Link from "next/link";
import Logo from "../public/logo-large.svg";
import IconNavOverview from "../public/icons/icon-nav-overview.svg";
import IconNavTransactions from "../public/icons/icon-nav-transactions.svg";
import IconNavBudgets from "../public/icons/icon-nav-budgets.svg";
import IconNavPots from "../public/icons/icon-nav-pots.svg";
import IconNavRecurringBills from "../public/icons/icon-nav-recurring-bills.svg";

export default function DesktopNav() {
  return (
    <div className="flex h-full flex-col rounded-br-2xl rounded-tr-2xl bg-gray-900 pb-14 text-gray-300">
      <div className="px-8 py-10">
        <Link href="/">
          <Logo className="text-white" />
          <span className="sr-only">Home</span>
        </Link>
      </div>
      <nav className="flex-1 pr-6">
        <ul className="space-y-1">
          <li>
            <Link
              className="flex items-center gap-4 px-8 py-4 text-base"
              href=""
            >
              <IconNavOverview className="flex size-5 items-center justify-center" />
              Overview
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 px-8 py-4 text-base"
              href=""
            >
              <IconNavTransactions className="size-5" />
              Transactions
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 px-8 py-4 text-base"
              href=""
            >
              <IconNavBudgets className="size-5" />
              Budgets
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 px-8 py-4 text-base"
              href=""
            >
              <IconNavPots className="size-5" />
              Pots
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center gap-4 px-8 py-4 text-base"
              href=""
            >
              <IconNavRecurringBills className="size-5" />
              Recurring Bills
            </Link>
          </li>
        </ul>
      </nav>
      <button>Minimize Menu</button>
    </div>
  );
}
