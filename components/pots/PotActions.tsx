import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import IconEllipsis from "@/public/icons/icon-ellipsis.svg";
import EditPotDialog from "./EditPotDialog";
import DeletePotDialog from "./DeletePotDialog";

interface Props {
  title: string;
  potId: number;
}

export default function PotActions({ title, potId }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconEllipsis className="size-4 text-gray-300" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-fit flex-col items-start p-2 text-left"
      >
        <EditPotDialog />
        <div className="my-1 h-px self-stretch bg-gray-100 px-5"></div>
        <DeletePotDialog title={title} potId={potId} />
      </PopoverContent>
    </Popover>
  );
}
