"use client";

import { SettingsContent } from "@/app/(workspaces)/[workspaceSlug]/settings/settings";
import { SettingsSidebar } from "@/app/(workspaces)/[workspaceSlug]/settings/settings-sidebar";
import { Sheet } from "@/components/ui/sheet";

function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
      <Sheet>
        <SettingsSidebar />
        <SettingsContent>
          <div className="flex h-full w-full">{children}</div>
        </SettingsContent>
      </Sheet>
    </div>
  );
}

export default SettingsLayout;
