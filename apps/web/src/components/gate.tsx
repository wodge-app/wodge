import { useCurrentUser } from "@repo/ui";
import { useCurrentWorkspace } from "./workspace/workspace-provider";
import { Role, grant } from "@repo/data";

export function Gate({
  children,
  permissions,
}: {
  children: React.ReactNode;
  permissions: Role["permissions"];
}) {
  const { members, structure } = useCurrentWorkspace();
  const user = useCurrentUser();

  const currentMember = members?.members.find((m) => m.id === user?.data?.id);

  if (!members || !structure) return null;

  if (!currentMember) {
    return null;
  }

  const roles = currentMember.roles.map((roleId) =>
    structure.roles.find((r) => r.id === roleId),
  ) as Role[];

  const isOwner = members.owner === user?.data?.id;
  const hasPermission = grant(roles, permissions);

  if (isOwner || hasPermission) return <>{children}</>;

  return null;
}
