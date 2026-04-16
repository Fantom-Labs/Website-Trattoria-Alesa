import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Divider({ className }: Props) {
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-warm-brown/20", className)}
    />
  );
}
