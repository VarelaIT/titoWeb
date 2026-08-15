import { DropdownMenu } from "radix-ui";
import type { IOption } from "../../../scripts/types";

interface IDropdownProps {
  options: IOption[];
  defaultValue?: unknown;
  onChange: (option: IOption) => void;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export function Dropdown({ options, onChange, asChild, className, children }: IDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={asChild} className={className}>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-stone-50 dark:bg-stone-700 shadow-md rounded-md p-2">
        {options.map((option, i) =>
          <DropdownMenu.Item key={"dropdown-item-" + option.label + "-" + i} onSelect={() => onChange(option)}
            className="hover:bg-gray-100 dark:hover:bg-stone-700 cursor-pointer p-2"
          >{option.label}</DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
