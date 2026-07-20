import { DropdownMenu } from "radix-ui";
import type { IOption } from "../../../scripts/types";

interface IDropdownProps {
  options: IOption[];
  defaultValue?: unknown;
  onChange: (option: IOption) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export function Dropdown({ options, onChange, asChild, children }: IDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild={asChild}>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white shadow-md rounded-md p-2">
        {options.map((option, i) =>
          <DropdownMenu.Item key={"dropdown-item-" + option.label + "-" + i} onSelect={() => onChange(option)}
            className="hover:bg-gray-100 cursor-pointer p-2"
          >{option.label}</DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
