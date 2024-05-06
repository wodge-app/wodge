import { isAdmin, isOwner, isTeamModerator } from "@repo/data";
import { useCurrentUser } from "./use-current-user";
import { useCurrentWorkspace } from "./use-current-workspace";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useIsTeamModerator(forceTeamId?: string) {
  const { structure, members } = useCurrentWorkspace();

  const { teamId } = useParams<{
    teamId: string;
  }>();

  const { user } = useCurrentUser();

  const [grant, setGrant] = useState(false);

  useEffect(() => {
    setGrant(
      isAdmin({
        userId: user?.id,
        members,
      }) ||
        isOwner({ userId: user?.id, members }) ||
        isTeamModerator({
          structure,
          userId: user?.id,
          teamId: forceTeamId || teamId,
        }),
    );
  }, [structure, teamId, user?.id]);

  return grant;
}
