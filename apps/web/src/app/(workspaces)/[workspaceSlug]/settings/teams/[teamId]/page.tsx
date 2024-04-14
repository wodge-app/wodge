"use client";

import { TeamSettings } from "@/components/settings/teams/team-settings";
import { useCurrentWorkspace } from "@repo/ui/hooks/use-current-workspace";
import { useMemo } from "react";

function TeamSettingsPage({
  params: { teamId },
}: {
  params: { workspaceSlug: string; teamId: string };
}) {
  const { structure } = useCurrentWorkspace();

  const team = useMemo(
    () => structure.teams.find((t) => t.id === teamId),
    [teamId, structure.teams],
  );

  if (!team) return <p>Team not found</p>;

  return <TeamSettings team={team} />;
}

export default TeamSettingsPage;