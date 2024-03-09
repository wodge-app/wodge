import { DrObj, Member, Team } from "@repo/data";
import { DataTable, Input } from "@repo/ui";
import { Mutable } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { useTable } from "../use-table";
import { linkedTeamColumns } from "./linked-teams-columns";
import { useCurrentWorkspace } from "@/components/workspace/workspace-context";
import { TeamsCombobox } from "./teams-combobox";
import { SettingsSearchInput } from "../settings-search-input";

interface LinkedTeamsProps {
  unLinkTeam: (teamId: string) => void;
  linkTeam: (teamId: string) => void;
  linkedTeams: string[];
}

export function LinkedTeams({
  unLinkTeam,
  linkTeam,
  linkedTeams,
}: LinkedTeamsProps) {
  const { structure } = useCurrentWorkspace();

  // const teams = structure.teams.filter((team) => linkedTeams.includes(team.id));

  // const nonLinkedTeams = structure.teams.filter(
  //   (team) => !linkedTeams.includes(team.id),
  // );

  const teams = structure.teams;

  const nonLinkedTeams = structure.teams;

  const { table } = useTable({
    data: teams as Mutable<DrObj<Team>>[],
    columns: linkedTeamColumns(unLinkTeam),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <SettingsSearchInput
          searchColumn="team"
          table={table}
          placeHolder="Search teams by name"
        />
        <TeamsCombobox teams={nonLinkedTeams} onClick={linkTeam} />
      </div>

      <DataTable table={table} />
    </div>
  );
}
