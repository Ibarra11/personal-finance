import { Card, CardContent, CardHeader } from "./ui/card";

export default function CurrencyCard({
  title,
  amount,
  isFeatured,
}: {
  title: string;
  amount: string;
  isFeatured?: boolean;
}) {
  return (
    <Card className={`space-y-3 ${isFeatured ? "bg-gray-900" : "bg-white"}`}>
      <CardHeader
        className={`pb-0 text-sm ${isFeatured ? "text-white" : "text-gray-500"}`}
      >
        {title}
      </CardHeader>
      <CardContent
        className={`text-3xl font-bold ${isFeatured ? "text-white" : "text-gray-900"}`}
      >
        ${amount}
      </CardContent>
    </Card>
  );
}
