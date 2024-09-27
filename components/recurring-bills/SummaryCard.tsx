import { Card } from "@/components/ui/card";

export function SummaryCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="flex-1 space-y-5 p-5">
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
