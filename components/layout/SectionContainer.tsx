import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
};

export function SectionContainer({
  children,
  className,
  as: Tag = "section",
  id,
}: Props) {
  return (
    <Tag
      id={id}
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Tag>
  );
}
