import { Button, ButtonProps } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface Props extends ButtonProps {
  text: string;
}

export default function SubmitButton({ text, ...props }: Props) {
  return (
    <Button {...props} className="group relative w-full" type="submit">
      <span className={"group-disabled:invisible"}>{text}</span>
      <Loader className="absolute hidden size-4 animate-spin group-disabled:block" />
    </Button>
  );
}
