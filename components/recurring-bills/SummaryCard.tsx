import { Card } from "@/components/ui/card";

export function SummaryCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="space-y-5 p-5 md:flex-1">
      <p className="text-base font-bold text-gray-900">Summary</p>
      <div className="first:pt-0 last:pb-0">{children}</div>
    </Card>
  );
}

export function SummaryItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-4 text-xs first:pt-0 last:border-b-0 last:pb-0">
      {children}
    </div>
  );
}
