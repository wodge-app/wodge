import { ReplOptions } from "repl";
import { Replicache, TEST_LICENSE_KEY, WriteTransaction } from "replicache";

/**
 * Client side spaces' data model
 */
export class Workspace {
  private static registry: Map<string, Workspace> = new Map();
  // dataStore: Replicache;

  private constructor(readonly id: string) {
    // this.dataStore = new Replicache({
    //   name: "chat-user-id",
    //   licenseKey: TEST_LICENSE_KEY,
    //   // pushURL: "/api/replicache-push",
    //   // pullURL: "/api/pull",
    //   mutators: {},
    // });
  }

  static getInstance(id: string): Workspace | undefined {
    let workspace = Workspace.registry.get(id);
    return workspace;
  }

  // static createWorkspace(data): Workspace {}
  static hasInstance(id: string): boolean {
    return Workspace.registry.has(id);
  }
}
