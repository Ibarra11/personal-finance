"use client";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Budget } from "@/services/budgets/getAllBudgets";
import { formatNumber } from "@/lib/utils";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function BudgetDonutGraph({ budgets }: { budgets: Budget[] }) {
  const [totalSpent, totalLimit] = budgets.reduce(
    (acc, curr) => {
      const nextTotalSpent = acc[0] + curr.totalSpent;
      const nextTotalLimit = acc[1] + Number(curr.maxSpend);
      return [nextTotalSpent, nextTotalLimit];
    },
    [0, 0],
  );

  const chartData = budgets.map((budget) => ({
    ...budget,
    categoryName: budget.category.name,
    fill: budget.theme.color,
  }));

  const chartConfig: ChartConfig = chartData.reduce(
    (acc, budget) => ({
      ...acc,
      [budget.categoryName]: {
        label: budget.categoryName,
      },
    }),
    {} as ChartConfig,
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[240px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="totalSpent"
          nameKey="categoryName"
          innerRadius={80}
          outerRadius={120}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="text-xl font-bold text-gray-900"
                    >
                      ${formatNumber(totalSpent)}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="text-xs text-gray-500"
                    >
                      of {formatNumber(totalLimit)} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
