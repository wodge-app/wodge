import { Member } from "@repo/data";
import { DeepReadonlyObject } from "replicache";
import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui";

interface MembersComboboxProps {
  members: readonly DeepReadonlyObject<Member>[];
  onClick?: (member: DeepReadonlyObject<Member>) => void;
}
export function MembersCombobox({ members, onClick }: MembersComboboxProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm">Add a member</Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          <CommandInput placeholder="Search a member" />
          <CommandEmpty>No member found.</CommandEmpty>
          <CommandGroup>
            {members.map((member) => (
              <CommandItem
                key={member.id}
                value={member.data.email + member.data.displayName}
                onSelect={() => {
                  onClick?.(member);
                  setOpen(false);
                }}
                className="flex items-center gap-3"
              >
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage src={member.data.avatar} />
                  <AvatarFallback>{member.data.displayName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span>{member.data.displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {member.data.email}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
