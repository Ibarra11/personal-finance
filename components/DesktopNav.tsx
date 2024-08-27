import Link from "next/link";
import Logo from "../public/logo-large.svg";
import IconNavOverview from "../public/icons/icon-nav-overview.svg";
import IconNavTransactions from "../public/icons/icon-nav-transactions.svg";
import IconNavBudgets from "../public/icons/icon-nav-budgets.svg";
import IconNavPots from "../public/icons/icon-nav-pots.svg";
import IconNavRecurringBills from "../public/icons/icon-nav-recurring-bills.svg";
import NavLink from "./NavLink";

export default function DesktopNav() {
  return (
    <div className="flex h-full flex-col rounded-br-2xl rounded-tr-2xl bg-gray-900 pb-14 text-gray-300">
      <div className="px-8 py-10">
        <Link href="/dashboard">
          <Logo className="text-white" />
          <span className="sr-only">Home</span>
        </Link>
      </div>
      <nav className="flex-1 pr-6">
        <ul className="space-y-1">
          <li>
            <NavLink
              icon={<IconNavOverview className="size-5" />}
              href="/dashboard"
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              icon={<IconNavTransactions className="size-5" />}
              href="/dashboard/transactions"
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/budgets"
              icon={<IconNavBudgets className="size-5" />}
            >
              Budgets
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/pots"
              icon={<IconNavPots className="size-5" />}
            >
              Pots
            </NavLink>
          </li>
          <li>
            <NavLink
              href="/dashboard/recurring-bills"
              icon={<IconNavRecurringBills className="size-5" />}
            >
              Recurring Bills
            </NavLink>
          </li>
        </ul>
      </nav>
      <button>Minimize Menu</button>
    </div>
  );
}
