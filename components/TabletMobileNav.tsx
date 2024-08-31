"use client";
import IconNavOverview from "../public/icons/icon-nav-overview.svg";
import IconNavTransactions from "../public/icons/icon-nav-transactions.svg";
import IconNavBudgets from "../public/icons/icon-nav-budgets.svg";
import IconNavPots from "../public/icons/icon-nav-pots.svg";
import IconNavRecurringBills from "../public/icons/icon-nav-recurring-bills.svg";
import NavLink from "./NavLink";
import useScrollBar from "@/hooks/useScrollbar";

export default function TabletMobileNav() {
  useScrollBar();
  return (
    <div className="h-full w-full rounded-tl-lg rounded-tr-lg bg-gray-900 px-4 pt-2 text-gray-300 md:px-10">
      <nav>
        <ul className="flex md:justify-between md:gap-10">
          <li className="flex-1">
            <NavLink
              icon={<IconNavOverview className="size-6 md:size-5" />}
              href="/dashboard"
            >
              <span className="hidden text-xs font-bold leading-4 md:inline">
                Overview
              </span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              icon={<IconNavTransactions className="size-6 md:size-5" />}
              href="/dashboard/transactions"
            >
              <span className="hidden text-xs font-bold leading-4 md:inline">
                Transactions
              </span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/budgets"
              icon={<IconNavBudgets className="size-6 md:size-5" />}
            >
              <span className="hidden text-xs font-bold leading-4 md:inline">
                Budgets
              </span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/pots"
              icon={<IconNavPots className="size-6 md:size-5" />}
            >
              <span className="hidden text-xs font-bold leading-4 md:inline">
                Pots
              </span>
            </NavLink>
          </li>
          <li className="flex-1">
            <NavLink
              href="/dashboard/recurring-bills"
              icon={<IconNavRecurringBills className="size-6 md:size-5" />}
            >
              <span className="hidden text-xs font-bold md:inline">
                Recurring Bills
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
