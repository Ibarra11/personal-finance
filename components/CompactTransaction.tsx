export default function CompactTransaction() {
  return (
    <div className="flex">
      <div className="flex flex-1 items-center gap-4">
        <div className="size-10 rounded-full bg-gray-300"></div>
        <p className="text-sm font-bold text-gray-900">John Doe</p>
      </div>
      <div className="space-y-2">
        <p className="text-green text-sm font-bold">75.50</p>
        <p className="text-xs text-gray-500">19 Aug 2024</p>
      </div>
    </div>
  );
}
