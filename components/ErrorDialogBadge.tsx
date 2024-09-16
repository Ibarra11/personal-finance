import { CircleAlert } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorDialogBadge({ message }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-sm bg-destructive p-2 text-destructive-foreground">
      <CircleAlert size={16} />
      <p className="text-xs font-bold">{message}</p>
    </div>
  );
}
