import { DrObj, Member } from "@repo/data";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Checkbox,
  DataTableActions,
  DataTableHeaderSelect,
  DataTableRowSelect,
  Header,
} from "@repo/ui";
import { ColumnDef } from "@tanstack/react-table";

export const teamMembersColumns = (
  removeMember: (memberId: string) => void,
  creatorId: string,
): ColumnDef<DrObj<Member>>[] => [
  {
    id: "select",
    header: ({ table }) => <DataTableHeaderSelect table={table} />,
    cell: ({ row }) => <DataTableRowSelect row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "avatar",
    header: () => <Header>Avatar</Header>,
    cell: ({ row, table }) => {
      const { avatar, displayName: name } = row.original.data;

      return (
        <div className="w-fit">
          <Avatar className="h-8 w-8 rounded-md ">
            <AvatarImage src={avatar} alt={name} className="rounded-md" />
            <AvatarFallback className="rounded-md capitalize">
              {name[0]}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorFn: (member) => member.data.email,
    id: "member",
    header: () => <Header>Member</Header>,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p>{row.original.data.displayName}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.data.email}
        </p>
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row, table }) => {
      const memberId = row.original.id;
      const disabled = table.getRowCount() === 1 || creatorId === memberId;
      return (
        <DataTableActions
          row={row}
          table={table}
          menuItems={[
            {
              label: "Remove from team",
              action: () => {
                removeMember(memberId);
              },
              destructive: true,
              disabled,
            },
          ]}
        />
      );
    },
  },
];