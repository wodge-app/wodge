import { beforeAll, describe, expect, test } from "vitest";
import { workspaceMutators } from "../models/workspace/workspace-mutators";
import { ReadTransaction, Replicache, TEST_LICENSE_KEY } from "replicache";

import { User } from "../models/user/user";
import { Team, WorkspaceStructure } from "../schemas/workspace.schema";
import { UserId } from "../tests";
import { nanoid } from "nanoid";
import { ID_LENGTH, WORKSPACE_TEAM_ID_LENGTH } from "../schemas/config";
import { makeWorkspaceStructureKey } from "../lib/keys";
import { a } from "vitest/dist/suite-UrZdHRff.js";
import exp from "constants";

const rep = new Replicache({
  licenseKey: TEST_LICENSE_KEY,
  name: "test-user",
  pullURL: undefined,
  pushURL: undefined,
  mutators: workspaceMutators,
});

describe("Team mutators", () => {
  beforeAll(async () => {
    await rep.mutate.initWorkspace({
      id: nanoid(ID_LENGTH),
      name: "Test Workspace",
      owner: UserId,

      environment: "local",
      createdAt: new Date().toISOString(),
    });
  });

  test("create a team", async () => {
    const team: Team = {
      createdBy: UserId,
      dirs: [],
      id: nanoid(WORKSPACE_TEAM_ID_LENGTH),
      members: [UserId],
      name: "Test Team",
      tags: [],
    };

    await rep.mutate.createTeam(team);

    const structure = await rep.query((tx: ReadTransaction) =>
      tx.get<WorkspaceStructure>(makeWorkspaceStructureKey())
    );

    expect(structure?.teams).toContainEqual(team);
  });

  test("create a team with invalid data", async () => {
    const team: Team = {
      createdBy: UserId,
      dirs: [],
      id: nanoid(WORKSPACE_TEAM_ID_LENGTH),
      members: [UserId],
      name: "",
      tags: [],
    };

    await rep.mutate.createTeam(team);

    const structure = await rep.query((tx: ReadTransaction) =>
      tx.get<WorkspaceStructure>(makeWorkspaceStructureKey())
    );

    expect(structure?.teams).not.toContain(team);
  });

  test("create a team with invalid owner", async () => {
    const team: Team = {
      createdBy: "-5oxKtIB8FXvYZL0ajjXp",
      dirs: [],
      id: nanoid(WORKSPACE_TEAM_ID_LENGTH),
      members: [UserId],
      name: "Test name",
      tags: [],
    };

    await rep.mutate.createTeam(team);

    const structure = await rep.query((tx: ReadTransaction) =>
      tx.get<WorkspaceStructure>(makeWorkspaceStructureKey())
    );

    expect(structure?.teams).not.toContain(team);
  });

  test("create a team with invalid members", async () => {
    const team: Team = {
      createdBy: UserId,
      dirs: [],
      id: nanoid(WORKSPACE_TEAM_ID_LENGTH),
      members: [],
      name: "Test name",
      tags: [],
    };

    await rep.mutate.createTeam(team);

    const structure = await rep.query((tx: ReadTransaction) =>
      tx.get<WorkspaceStructure>(makeWorkspaceStructureKey())
    );

    expect(structure?.teams).not.toContain(team);
  });
});
