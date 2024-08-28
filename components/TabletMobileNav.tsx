import IconNavOverview from "../public/icons/icon-nav-overview.svg";
import IconNavTransactions from "../public/icons/icon-nav-transactions.svg";
import IconNavBudgets from "../public/icons/icon-nav-budgets.svg";
import IconNavPots from "../public/icons/icon-nav-pots.svg";
import IconNavRecurringBills from "../public/icons/icon-nav-recurring-bills.svg";
import NavLink from "./NavLink";

export default function TabletMobileNav() {
  return (
    <div className="h-full w-full rounded-tl-lg rounded-tr-lg bg-gray-900 px-10 py-2 text-gray-300">
      <nav>
        <ul className="flex justify-between gap-10">
          <li className="flex-1">
            <NavLink
              icon={<IconNavOverview className="size-5" />}
              href="/dashboard"
            >
              Overview
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              icon={<IconNavTransactions className="size-5" />}
              href="/dashboard/transactions"
            >
              Transactions
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/budgets"
              icon={<IconNavBudgets className="size-5" />}
            >
              Budgets
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/pots"
              icon={<IconNavPots className="size-5" />}
            >
              Pots
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/recurring-bills"
              icon={<IconNavRecurringBills className="size-5" />}
            >
              Recurring bills
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
